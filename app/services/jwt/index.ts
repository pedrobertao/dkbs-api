import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models/user";

export function generateToken(user: User): string {
  const JWT_SECRET = process.env.JWT_SECRET || "";

  return jwt.sign(
    { id: user.id, role: user.role, expiresIn: "1d", issuer: "dkbs-api" },
    JWT_SECRET
  );
}

export function verifyPassword(
  inputPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}
