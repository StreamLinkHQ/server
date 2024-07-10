import { Request, Response } from "express";
import { db } from "../app";
import { transferSplToken } from "../utils";

export const payWinners = async (req: Request, res: Response) => {
  try {
    const { recipients, tokenName } = req.body;
    console.log(recipients);
    for (const r of recipients) {
      const signature = await transferSplToken(r.amount, r.wallet, tokenName);
      const newTransaction = await db.transaction.create({
        data: {
          signature,
          amount: r.amount,
          createdAt: new Date(),
          user: {
            connect: {
              id: r.userId
            }
          }
        }
      })
      console.log(newTransaction)
    }
    res.status(200).json({ data: "Payment successful" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
