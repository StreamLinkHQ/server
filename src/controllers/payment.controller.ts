import { Request, Response } from "express";
import { transferSplToken } from "../utils";

export const payWinners = async (req: Request, res: Response) => {
  try {
    const { recipients, tokenName } = req.body;
    console.log(recipients);
    for (const r of recipients) {
      await transferSplToken(r.amount, r.wallet, tokenName);
    }
    res.status(200).json({ data: "Payment successful" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
