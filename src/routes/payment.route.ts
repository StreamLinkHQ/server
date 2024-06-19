import express from "express";
import { payWinners } from "../controllers/payment.controller";

const router = express.Router()

router.get("/", payWinners)


export default router