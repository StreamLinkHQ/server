"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payWinners = void 0;
const utils_1 = require("../utils");
const payWinners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipients, tokenName } = req.body;
        console.log(recipients);
        for (const r of recipients) {
            yield (0, utils_1.transferSplToken)(r.amount, r.wallet, tokenName);
        }
        res.status(200).json({ data: "Payment successful" });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.payWinners = payWinners;
//# sourceMappingURL=payment.controller.js.map