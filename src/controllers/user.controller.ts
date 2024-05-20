import { Request, Response } from "express";
import { db } from "../app";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, wallet, image } = req.body;
    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      res.status(200).json(user);
    }
    const newUser = await db.user.create({
      data: {
        name,
        email,
        image,
        walletAddress: wallet,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};
