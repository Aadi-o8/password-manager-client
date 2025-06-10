// utils/getPDAs.ts
import { PublicKey } from '@solana/web3.js';

export async function getUserPDA(user: PublicKey): Promise<PublicKey> {
  const [pda] = await PublicKey.findProgramAddress(
    [Buffer.from('user'), user.toBuffer()],
    new PublicKey('YOUR_PROGRAM_ID_HERE') // Replace with your actual programId
  );
  return pda;
}
