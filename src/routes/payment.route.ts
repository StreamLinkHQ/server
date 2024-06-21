import express from "express";
import { payWinners } from "../controllers/payment.controller";

const router = express.Router()

router.post("/", payWinners)


export default router