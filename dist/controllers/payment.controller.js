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
        for (const r of recipients) {
            yield (0, utils_1.transferSplToken)(r.amount, r.wallet, tokenName);
        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
exports.payWinners = payWinners;
// export const transferSplToken = async (req: Request, res: Response) => {
//   try {
//     const { recipients, tokenName } = req.body
//     const sender = await getKeypair()
//     const token = tokenName.toLowerCase();
//     const tokenMintAccounts: { [key: string]: string } = {
//       usd: "",
//       bonk: "",
//       abj: "ArPqn2d4q1BepXfQmWLbELMBMtQjyUiFMcTvQjDFT22i",
//     };
//     const recipient = new PublicKey("8sgmAo1YQqhxA6zykyUXwEMFzC9Yi5CRwSMKXLxApTVn");
//     const tokenMintAccount = new PublicKey(tokenMintAccounts[token]);
//     const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
//     console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);
//     // Get or create the source and destination token accounts to store this token
//     const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
//       connection,
//       sender,
//       tokenMintAccount,
//       sender.publicKey
//     );
//     const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
//       connection,
//       sender,
//       tokenMintAccount,
//       recipient
//     );
//     // const userdata = userDatas.map((user) => (
//     //     await transfer(
//     //         connection,
//     //         sender,
//     //         sourceTokenAccount.address,
//     //         destinationTokenAccount.address,
//     //         sender,
//     //         2000000 * MINOR_UNITS_PER_MAJOR_UNITS
//     // ))
//     // Transfer the tokens
//     // const signature = await transfer(
//     //   connection,
//     //   sender,
//     //   sourceTokenAccount.address,
//     //   destinationTokenAccount.address,
//     //   sender,
//     //   2000000 * MINOR_UNITS_PER_MAJOR_UNITS
//     // );
//     // const explorerLink = getExplorerLink("transaction", signature, "devnet");
//     console.log(`✅ Transaction confirmed, explorer link is: ${signature}!`);
//   } catch (error) {
//     console.log("Error: ", error)
//   }
// }
//# sourceMappingURL=payment.controller.js.map