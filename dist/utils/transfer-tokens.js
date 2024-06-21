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
exports.transferSplToken = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const getKeypair_1 = require("./getKeypair");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
const transferSplToken = (amount, walletAddress, tokenName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sender = yield (0, getKeypair_1.getKeypair)();
        const token = tokenName.toLowerCase();
        const tokenMintAccounts = {
            usd: "",
            bonk: "",
            abj: "ArPqn2d4q1BepXfQmWLbELMBMtQjyUiFMcTvQjDFT22i",
        };
        const recipient = new web3_js_1.PublicKey(walletAddress);
        const tokenMintAccount = new web3_js_1.PublicKey(tokenMintAccounts[token]);
        const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
        console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);
        // Get or create the source and destination token accounts to store this token
        const sourceTokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, sender, tokenMintAccount, sender.publicKey);
        const destinationTokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, sender, tokenMintAccount, recipient);
        const signature = yield (0, spl_token_1.transfer)(connection, sender, sourceTokenAccount.address, destinationTokenAccount.address, sender, amount * MINOR_UNITS_PER_MAJOR_UNITS);
        console.log(`✅ Transaction confirmed, explorer link is: ${signature}!`);
        return signature;
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
exports.transferSplToken = transferSplToken;
//# sourceMappingURL=transfer-tokens.js.map