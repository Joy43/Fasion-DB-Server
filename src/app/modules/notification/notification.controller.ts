import { Request, Response } from "express";
import { sendMessageToToken } from "../../utils/fcmService";


const tokens = new Set<string>();

export const registerToken = (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "FCM token required" });
  tokens.add(token);
  res.json({ message: "Token registered successfully" });
};

export const sendNotification = async (req: Request, res: Response) => {
  const { token, title, body, data } = req.body;
  if (!token) return res.status(400).json({ error: "Token required" });

  try {
    const response = await sendMessageToToken(token, { title, body, data });
    res.json({ success: true, response });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const broadcastNotification = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const results: any[] = [];

  for (const token of tokens) {
    try {
      const resp = await sendMessageToToken(token, { title, body });
      results.push({ token, success: true, resp });
    } catch (err: any) {
      results.push({ token, success: false, error: err.message });
    }
  }

  res.json({ total: tokens.size, results });
};
