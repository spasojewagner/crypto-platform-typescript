// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// extended Request
export interface AuthRequest extends Request {
  user?: { id: string };
}

const COOKIE_NAME = "jwt";
const SECRET = process.env.JWT_SECRET || "tajna-koja-bi-trebala-biti-u-env-fajlu";

export const protectRoute = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // 1) probamo iz Authorization header-a
    let token: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // 2) ako ga nema u headeru, uzmemo iz cookie-ja
    if (!token && req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }

    if (!token) {
      return res.status(401).json({ error: "Pristup nije dozvoljen. Nedostaje token." });
    }

    // verifikacija
    const decoded = jwt.verify(token, SECRET) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("Greška u autentifikaciji:", err);
    return res.status(401).json({ error: "Pristup nije dozvoljen. Nevažeći token." });
  }
};
