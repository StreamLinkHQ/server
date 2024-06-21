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
exports.getKeypair = void 0;
const web3_js_1 = require("@solana/web3.js");
const getKeypair = () => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = process.env.SECRET_KEY;
    if (!privateKey) {
        throw new Error("Private key not provided");
    }
    let secretKeyArray = JSON.parse(privateKey);
    const payer = yield web3_js_1.Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
    return payer;
});
exports.getKeypair = getKeypair;
//# sourceMappingURL=getKeypair.js.map