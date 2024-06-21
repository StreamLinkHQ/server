import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { getKeypair } from "./getKeypair";

const connection = new Connection(clusterApiUrl("devnet"));

export const transferSplToken = async (
  amount: number,
  walletAddress: string,
  tokenName: string
) => {
  try {
    const sender = await getKeypair();
    const token = tokenName.toLowerCase();

    const tokenMintAccounts: { [key: string]: string } = {
      usd: "",
      bonk: "",
      abj: "ArPqn2d4q1BepXfQmWLbELMBMtQjyUiFMcTvQjDFT22i",
    };
    const recipient = new PublicKey(walletAddress);

    const tokenMintAccount = new PublicKey(tokenMintAccounts[token]);

    const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

    console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

    // Get or create the source and destination token accounts to store this token
    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      tokenMintAccount,
      sender.publicKey
    );

    const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      tokenMintAccount,
      recipient
    );

    const signature = await transfer(
      connection,
      sender,
      sourceTokenAccount.address,
      destinationTokenAccount.address,
      sender,
      amount * MINOR_UNITS_PER_MAJOR_UNITS
    );
    console.log(`✅ Transaction confirmed, explorer link is: ${signature}!`);
    return signature
  } catch (error) {
    console.log("Error: ", error);
  }
};
