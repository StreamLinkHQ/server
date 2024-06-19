import { Keypair } from "@solana/web3.js";

export const getKeypair = async () => {
    const privateKey = process.env.SECRET_KEY;
    
    if (!privateKey) {
      throw new Error("Private key not provided");
    }
    console.log(privateKey);
  
    let secretKeyArray = JSON.parse(privateKey);
    const payer = await Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
  
    return payer;
  };