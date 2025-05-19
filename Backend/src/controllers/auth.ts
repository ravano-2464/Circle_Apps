import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../services/email";
import { hashPassword, verifyToken } from "../utils/jwtutils";

const users: { email: string; password: string }[] = [
  { email: "user@example.com", password: "123456" },
]; // Dummy data

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  await sendResetPasswordEmail(email, token);
  res.status(200).json({ message: "Reset password instructions sent to email" });
};

export const resetPassword = (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = verifyToken(token);
    const user = users.find((u) => u.email === decoded.email);

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    user.password = hashPassword(newPassword);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
