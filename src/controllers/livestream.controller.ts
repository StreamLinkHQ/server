import { Request, Response } from "express";
import axios from "axios";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { db } from "../app";

export const createLiveStream = async (req: Request, res: Response) => {
  try {
    const { streamName, userId } = req.body;
    const { data } = await axios.post(
      "https://api.huddle01.com/api/v1/create-room",
      {
        title: streamName,
        hostWallets: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.HUDDLE_API_KEY,
        },
      }
    );
    await db.liveStream.create({
      data: {
        userId,
        name: data.data.roomId,
      },
    });
    res.status(201).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createStreamToken = async (req: Request, res: Response) => {
  try {
    const { roomId, userType } = req.body;
    const accessToken = new AccessToken({
      apiKey: process.env.API_KEY!,
      roomId: roomId as string,
      role: userType === Role.HOST ? Role.HOST : Role.GUEST,
      permissions: {
        admin: userType === Role.HOST ? true : false,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
    });

    const token = accessToken.toJwt();

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};
