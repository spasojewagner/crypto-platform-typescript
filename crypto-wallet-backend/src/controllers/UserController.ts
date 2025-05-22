// src/controllers/UserController.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Extend Express Request da bi imao user.id
export interface AuthRequest extends Request {
  user?: { id: string };
}

// REGISTER novog korisnika
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, fullName, password, invitation, terms } = req.body;

    if (!email || !fullName || !password) {
      res.status(400).json({ error: "Molimo popunite sva obavezna polja" });
      return;
    }

    if (!terms) {
      res.status(400).json({ error: "Morate prihvatiti uslove korištenja" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Korisnik sa ovom email adresom već postoji" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      invitation,
      terms,
      isAuthenticated: true,
    });
    await newUser.save();

    // Generiši token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "tajna-koja-bi-trebala-biti-u-env-fajlu",
      { expiresIn: "30d" }
    );

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    // Postavi JWT u HttpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",             // ako front/back nisu na istoj domeni
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dana
    });

    res.status(201).json({ user: userWithoutPassword, token });
    return;
  } catch (error) {
    next(error);
  }
};

// LOGIN korisnika
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Molimo unesite email i lozinku" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Nevažeći email ili lozinka" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Nevažeći email ili lozinka" });
      return;
    }

    user.isAuthenticated = true;
    await user.save();

    // Generiši token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "tajna-koja-bi-trebala-biti-u-env-fajlu",
      { expiresIn: "30d" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    // Postavi JWT u HttpOnly cookie
    res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",            // <— cookie vrijedi za sve rute na domeni
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    res.status(200).json({ user: userWithoutPassword, token });
    return;
  } catch (error) {
    next(error);
  }
};

// LOGOUT korisnika
export const logout: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    await User.findByIdAndUpdate(userId, { isAuthenticated: false });
    // Očisti cookie
   res.clearCookie("jwt", {
  path: "/", 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production"
});
    res.status(200).json({ message: "Uspješno ste se odjavili" });
  } catch (error) {
    next(error);
  }
};

// AŽURIRANJE profila
export const updateProfile: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id;
    const { fullName, email, profilePic } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    if (email) {
      const exists = await User.findOne({ email, _id: { $ne: userId } });
      if (exists) {
        res.status(400).json({ error: "Email adresa već postoji" });
        return;
      }
    }

    const updateData: { fullName?: string; email?: string; profilePic?: string } = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (profilePic) updateData.profilePic = profilePic;

    const updatedUser = await User
      .findByIdAndUpdate(userId, updateData, { new: true })
      .select("-password");

    if (!updatedUser) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    res.status(200).json({ user: updatedUser, message: "Profil je uspješno ažuriran" });
    return;
  } catch (error) {
    next(error);
  }
};

// PROVJERA autentifikacije
export const checkAuth: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    res.status(200).json({ user });
    return;
  } catch (error) {
    next(error);
  }
};

// SVI korisnici
export const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
    return;
  } catch (error) {
    next(error);
  }
};

// KORISNIK po ID-u
export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    res.status(200).json({ user });
    return;
  } catch (error) {
    next(error);
  }
};
