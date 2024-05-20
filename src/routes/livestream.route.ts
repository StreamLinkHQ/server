import express from "express";
import {
  createLiveStream,
  createStreamToken,
} from "../controllers/livestream.controller";

const router = express.Router();

router.post("/", createLiveStream);
router.post("/token", createStreamToken);

export default router;
