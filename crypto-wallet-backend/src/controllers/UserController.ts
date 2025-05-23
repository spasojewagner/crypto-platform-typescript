// src/controllers/UserController.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/emailService";

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

    let inviterUser = null;
    
    // Ako je unesen invitation kod, provjeri da li postoji
    if (invitation && invitation.trim() !== "") {
      inviterUser = await User.findOne({ myInvitationCode: invitation.trim() });
      if (!inviterUser) {
        res.status(400).json({ error: "Nevaljan invitation kod" });
        return;
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      invitationUsed: invitation || "",
      invitedBy: inviterUser ? inviterUser._id : null,
      terms,
      isAuthenticated: true,
    });
    
    await newUser.save();

    // Ako je neko pozvao ovog korisnika, ažuriraj pozvaoce
    if (inviterUser) {
      await User.findByIdAndUpdate(
        inviterUser._id,
        {
          $push: { invitedUsers: newUser._id },
          $inc: { invitationCount: 1 }
        }
      );
    }

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
      sameSite: "none",
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
      path: "/",
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

// DOBIJANJE INVITATION STATISTIKA
export const getInvitationStats: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    const user = await User.findById(userId)
      .populate('invitedUsers', 'fullName email createdAt')
      .populate('invitedBy', 'fullName email')
      .select('myInvitationCode invitationCount invitedUsers invitedBy');

    if (!user) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    res.status(200).json({
      myInvitationCode: user.myInvitationCode,
      invitationCount: user.invitationCount,
      invitedUsers: user.invitedUsers,
      invitedBy: user.invitedBy
    });
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
//verifikacija
// Funkcija za generiranje 6-cifrenog koda
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POŠALJI VERIFIKACIONI KOD
export const sendVerificationCode: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    console.log('📧 Starting verification code send process...');
    
    const userId = req.user?.id;
    if (!userId) {
      console.log('❌ No user ID found in request');
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    console.log('👤 Finding user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('❌ User not found for ID:', userId);
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    if (user.isEmailVerified) {
      console.log('✅ Email already verified for user:', user.email);
      res.status(400).json({ error: "Email je već verifikovan" });
      return;
    }

    // Check if there's an active code (less than 2 minutes old)
    if (user.verificationCodeExpires && new Date() < user.verificationCodeExpires) {
      const timeLeft = Math.ceil((user.verificationCodeExpires.getTime() - new Date().getTime()) / 1000);
      console.log('⏰ Active verification code still valid for', timeLeft, 'seconds');
      res.status(400).json({ 
        error: `Verifikacioni kod je već poslat. Pokušajte ponovo za ${timeLeft} sekundi.`,
        timeLeft 
      });
      return;
    }

    // Generiši novi kod
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minuta

    console.log('🔢 Generated verification code:', verificationCode);
    console.log('⏰ Code expires at:', expiresAt);

    // Sačuvaj kod u bazi
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expiresAt;
    await user.save();

    console.log('💾 Verification code saved to database');

    // Pošalji email
    try {
      console.log('📤 Attempting to send email to:', user.email);
      await sendVerificationEmail(user.email, verificationCode, user.fullName);
      
      console.log('✅ Verification email sent successfully');
      res.status(200).json({ 
        message: "Verifikacioni kod je poslat na vaš email",
        expiresIn: 120 // 2 minuta u sekundama
      });
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      
      // Clear the verification code since email failed
      user.verificationCode ="";
      user.verificationCodeExpires = null;
      await user.save();
      
      // Return more specific error message
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown email error';
      res.status(500).json({ 
        error: "Greška pri slanju email-a",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      });
    }
    return;
  } catch (error) {
    console.error("❌ Unexpected error in sendVerificationCode:", error);
    next(error);
  }
};

// VERIFIKUJ EMAIL KOD (Enhanced with better error handling)
export const verifyEmail: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    console.log('🔍 Starting email verification process...');
    
    const userId = req.user?.id;
    const { code } = req.body;

    if (!userId) {
      console.log('❌ No user ID found in request');
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    if (!code) {
      console.log('❌ No verification code provided');
      res.status(400).json({ error: "Verifikacioni kod je obavezan" });
      return;
    }

    console.log('👤 Finding user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('❌ User not found for ID:', userId);
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    if (user.isEmailVerified) {
      console.log('✅ Email already verified for user:', user.email);
      res.status(400).json({ error: "Email je već verifikovan" });
      return;
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
      console.log('❌ No verification code found for user');
      res.status(400).json({ error: "Verifikacioni kod nije pronađen. Molimo zatražite novi kod." });
      return;
    }

    // Provjeri da li je kod istekao
    if (new Date() > user.verificationCodeExpires) {
      console.log('⏰ Verification code expired');
      // Očisti istekli kod
      user.verificationCode = "";
      user.verificationCodeExpires = null;
      await user.save();
      
      res.status(400).json({ error: "Verifikacioni kod je istekao. Molimo zatražite novi kod." });
      return;
    }

    // Provjeri da li se kod slaže
    const providedCode = code.trim();
    if (user.verificationCode !== providedCode) {
      console.log('❌ Invalid verification code provided:', providedCode, 'Expected:', user.verificationCode);
      res.status(400).json({ error: "Nevažeći verifikacioni kod" });
      return;
    }

    console.log('✅ Verification code is valid, updating user...');

    // Verifikuj korisnika
    user.isEmailVerified = true;
    user.verificationCode = "";
    user.verificationCodeExpires = null;
    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();

    console.log('✅ Email verification completed successfully');
    res.status(200).json({ 
      message: "Email je uspješno verifikovan!",
      user: userWithoutPassword
    });
    return;
  } catch (error) {
    console.error("❌ Unexpected error in verifyEmail:", error);
    next(error);
  }
};

// PROVJERI STATUS VERIFIKACIJE (Enhanced)
export const getVerificationStatus: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Niste autentifikovani" });
      return;
    }

    const user = await User.findById(userId).select('isEmailVerified verificationCodeExpires');
    if (!user) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    const now = new Date();
    const hasActiveCode = user.verificationCodeExpires && now < user.verificationCodeExpires;
    const timeLeft = hasActiveCode 
      ? Math.ceil((user.verificationCodeExpires!.getTime() - now.getTime()) / 1000)
      : 0;

    res.status(200).json({
      isEmailVerified: user.isEmailVerified,
      hasActiveCode: !!hasActiveCode,
      codeExpiresAt: user.verificationCodeExpires,
      timeLeft
    });
    return;
  } catch (error) {
    next(error);
  }
};
