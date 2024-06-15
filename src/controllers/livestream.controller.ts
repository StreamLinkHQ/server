import { Request, Response } from "express";
import axios from "axios";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { API } from "@huddle01/server-sdk/api";
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
    const response = await db.liveStream.create({
      data: {
        userId,
        name: data.data.roomId,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createStreamToken = async (req: Request, res: Response) => {
  try {
    const { roomId, userType } = req.body;

    const accessToken = new AccessToken({
      apiKey: process.env.HUDDLE_API_KEY!,
      roomId: roomId as string,
      role: userType === Role.HOST ? Role.HOST : Role.GUEST,
      permissions: {
        admin: userType === Role.HOST ? true : false,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: userType === Role.HOST ? true : false,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: userType === Role.HOST ? true : false,
      },
    });

    const token = await accessToken.toJwt();

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getStreamParticipants = async (req: Request, res: Response) => {
  try {
    const api = new API({
      apiKey: process.env.HUDDLE_API_KEY!,
    });
    const participants = await api.getParticipants({
      meetingId: "YOUR_MEETING_ID",
    });
    console.log(participants?.data);
    res.status(201).json(participants?.data);
  } catch (error) {
    res.status(400).json({ error });
  }
};
