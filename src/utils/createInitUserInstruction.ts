// utils/createInitUserInstruction.ts
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
// import { PROGRAM_ID } from './constants'; // Your Solana program ID

const PROGRAM_ID = new PublicKey("BrERXYCXugnoSFXoPkn9CcSjgEhbJkp4RTjxWzoFHToo");

export function createInitUserInstruction(
  payer: PublicKey,
  userPDA: PublicKey
): TransactionInstruction {
  const data = Buffer.from([0]); // assuming 0 is your instruction discriminator

  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: userPDA, isSigner: false, isWritable: true },
    // add any other accounts your instruction needs
  ];

  return new TransactionInstruction({
    keys,
    programId: PROGRAM_ID,
    data,
  });
}
