import { Request, Response } from "express";
import { processBfhl } from "../services/bfhl.services";

export function bfhlPost(req: Request, res: Response): void {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    res.status(400).json({ error: "data must be an array" });
    return;
  }

  const result = processBfhl(data);
  res.status(200).json(result);
}
