import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};