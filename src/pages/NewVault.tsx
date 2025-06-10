import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Vault, Loader } from 'lucide-react';
import { useWalletContext } from '../context/WalletContext';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, TransactionInstruction, PublicKey } from '@solana/web3.js';

const PROGRAM_ID = new PublicKey('BrERXYCXugnoSFXoPkn9CcSjgEhbJkp4RTjxWzoFHToo');
// const AES_KEY = new TextEncoder().encode('this_is_a_demo_key_32_bytes_long!!');

const NewVault: React.FC = () => {
  const [vaultName, setVaultName] = useState('');
  // const [field, setField] = useState('');
  // const [data, setData] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const { connected } = useWalletContext();
  const { connection } = useConnection();
  const publicKey = useWallet();
  const navigate = useNavigate();

  const getUserPDA = (userPubkey: PublicKey) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('user_at_password_manager'), userPubkey.toBuffer()],
      PROGRAM_ID
    );
  };

  const getVaultPDA = (userPubkey: PublicKey, name: string) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), userPubkey.toBuffer(), Buffer.from(name)],
      PROGRAM_ID
    );
  };

  // const encryptAES = async (text: string): Promise<Uint8Array> => {
  //   const textBuffer = new TextEncoder().encode(text);
  //   const iv = crypto.getRandomValues(new Uint8Array(16));
  //   const key = await crypto.subtle.importKey('raw', AES_KEY, 'AES-CBC', false, ['encrypt']);
  //   const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, textBuffer);
  //   const encryptedArray = new Uint8Array(encrypted);
  //   // Ensure exactly 32 bytes: pad with zeros if shorter, truncate if longer
  //   const result = new Uint8Array(32);
  //   result.set(encryptedArray.slice(0, 32));
  //   return result;
  // };

  const handleCreateVault = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected || !publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    if (!vaultName.trim()) {
      alert('Please enter a vault name.');
      return;
    }

    // Validate vaultName length (max 32 bytes in UTF-8)
    // const encodedName = Buffer.from(vaultName, 'utf-8');
    // if (encodedName.length > 32) {
    //   alert('Vault name must be 32 bytes or less in UTF-8 encoding.');
    //   return;
    // }

    setIsCreating(true);
    if (!publicKey.publicKey || !publicKey.signTransaction) { return ;}

    try {
      const [userPda] = getUserPDA(publicKey.publicKey);
      const [vaultPda] = getVaultPDA(publicKey.publicKey, vaultName);

      // Log PDA seeds for debugging
      console.log('PDA Seeds:', {
        userPda: userPda.toBase58(),
        userPdaSeeds: ['user_at_password_manager', publicKey.publicKey.toBase58()],
        vaultPda: vaultPda.toBase58(),
        vaultPdaSeeds: ['vault', publicKey.publicKey.toBase58(), vaultName],
      });

      // Pad or truncate vaultName to exactly 32 bytes
      // const nameBuffer = Buffer.alloc(32); // Initialize 32 bytes with zeros
      // encodedName.copy(nameBuffer, 0, 0, Math.min(encodedName.length, 32)); // Copy up to 32 bytes
      const nameBytes = new TextEncoder().encode(vaultName);
      const instructionData = Buffer.from([1, ...nameBytes]);

      // const instructionData = Buffer.concat([
      //   Buffer.from([1]), // Discriminator
      //   nameBuffer, // Exactly 32 bytes
      // ]);

      // Log instruction data
      // console.log('Instruction Data:', {
      //   discriminator: instructionData[0],
      //   vaultName: vaultName,
      //   nameBuffer: nameBuffer.toString('hex'),
      //   instructionData: instructionData.toString('hex'),
      // });

      const instruction = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
          { pubkey: publicKey.publicKey, isSigner: true, isWritable: false },
          { pubkey: userPda, isSigner: false, isWritable: true },
          { pubkey: vaultPda, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: instructionData,
      });

      const transaction = new Transaction().add(instruction);
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey.publicKey;

        // Sign the transaction
        // transaction.partialSign(governanceMint);
        const signedTransaction = await publicKey.signTransaction(transaction);
        
        // Send and confirm transaction
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        
        // Use the non-deprecated version of confirmTransaction with TransactionConfirmationStrategy
        await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight
        });

      console.log('Vault created successfully:', signature);
      alert('Vault created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create vault:', error);
      alert('Failed to create the vault. Check console for details.');
    } finally {
      setIsCreating(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Vault className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">Wallet Not Connected</h3>
            <p className="text-gray-500 mb-6">Please connect your wallet to create a vault</p>
            <Link
              to="/"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Vault</h1>
              <p className="text-gray-400 mt-1">Set up a secure vault for your credentials</p>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <form onSubmit={handleCreateVault} className="space-y-6">
              <div>
                <label htmlFor="vaultName" className="block text-sm font-medium text-gray-300 mb-2">
                  Vault Name *
                </label>
                <input
                  type="text"
                  id="vaultName"
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
                  placeholder="e.g., Personal Accounts, Work Credentials"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                  disabled={isCreating}
                />
              </div>
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2">Security Notice</h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Your vault will be created on the Solana blockchain. Only you will have access to manage your vault.
                  Make sure to keep your wallet secure as it's the only way to access your vaults.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4">
                <Link
                  to="/"
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                  tabIndex={isCreating ? -1 : 0}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isCreating || !vaultName.trim()}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Creating Vault...</span>
                    </>
                  ) : (
                    <>
                      <Vault className="h-5 w-5" />
                      <span>Create Vault</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">What happens when you create a vault?</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {[
                'A new Solana account is created to store your vault data',
                'You maintain complete ownership and control over your vault',
                'Small transaction fee (typically <0.01 SOL) required for blockchain storage',
              ].map((text, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVault;