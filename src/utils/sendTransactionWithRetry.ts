// utils/sendTransactionWithRetry.ts
import {
  Connection,
  Transaction,
  Signer,
  sendAndConfirmTransaction
} from '@solana/web3.js';

export async function sendTransactionWithRetry(
  connection: Connection,
  transaction: Transaction,
  signers: Signer[],
  payer: Signer
) {
  return await sendAndConfirmTransaction(connection, transaction, [payer, ...signers]);
}
