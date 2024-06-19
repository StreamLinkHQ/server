import { Request, Response } from "express";
import { transferSplToken } from "../utils";

export const payWinners = async (req: Request, res: Response) => {
  try {
    const { recipients, tokenName } = req.body;

    for (const r of recipients) {
      await transferSplToken(r.amount, r.wallet, tokenName);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

