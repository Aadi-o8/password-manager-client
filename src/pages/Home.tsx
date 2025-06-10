import React, { useEffect, useState } from 'react';
import { Shield, Lock, Key, Database } from 'lucide-react';
import { useWalletContext } from '../context/WalletContext';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import VaultTile from '../components/VaultTile';
import { Vault } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';

// Dummy data for demonstration
const dummyVaults: Vault[] = [];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { connected, wallet } = useWalletContext();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const programId = new PublicKey("BrERXYCXugnoSFXoPkn9CcSjgEhbJkp4RTjxWzoFHToo");

  // 🎯 Automatically create user PDA account on connect
  useEffect(() => {
    const handleAccount = async () => {
      if (!connected || !wallet?.publicKey || typeof wallet.signTransaction !== 'function') return;

      setLoading(true);
      const user = wallet.publicKey;

      try {
        const [userPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from('user_at_password_manager'), user.toBuffer()],
          programId
        );

        const acc = await connection.getAccountInfo(userPDA);
        if (acc) {
          toast.success('User Account found!');
          return navigate('/');
        }

        const instruction = new TransactionInstruction({
          keys: [
            { pubkey: user, isSigner: true, isWritable: true },
            { pubkey: userPDA, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          ],
          programId,
          data: Buffer.from([0]),
        });

        const tx = new Transaction().add(instruction);
        tx.feePayer = user;

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;

        const signed = await wallet.signTransaction(tx);
        const sig = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight });

        toast.success('User Account created!');
        navigate('/');

      } catch (err) {
        console.error("Error in PDA setup:", err);
        toast.error('Error setting up user account');
      } finally {
        setLoading(false);
      }
    };

    handleAccount();
  }, [connected, wallet, connection, navigate]);

  const features = [
    {
      title: 'Military-Grade Encryption',
      description: 'Your passwords are protected using AES-256 encryption, the same standard used by governments and military organizations worldwide. All encryption happens directly in your browser, ensuring your master password never leaves your device. Even if someone intercepts your data, it would take billions of years to crack with current technology.',
      icon: Lock,
      gradient: 'bg-gradient-to-br from-green-600/20 to-emerald-600/20',
      imagePosition: 'right' as const,
    },
    {
      title: 'Blockchain Infrastructure',
      description: 'Built on Solana, one of the fastest and most secure blockchain networks available. Your encrypted vault data is distributed across thousands of nodes, eliminating single points of failure. No central servers means no corporate data breaches, no government surveillance, and no unexpected service shutdowns.',
      icon: Database,
      gradient: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20',
      imagePosition: 'left' as const,
    },
    {
      title: 'True Digital Ownership',
      description: 'You own your data completely. No subscription fees, no vendor lock-in, no terms of service changes that compromise your privacy. Your wallet controls access to your vaults, and you can export or migrate your data at any time. Experience the freedom of true digital sovereignty.',
      icon: Key,
      gradient: 'bg-gradient-to-br from-purple-600/20 to-pink-600/20',
      imagePosition: 'right' as const,
    },
  ];

  if (!connected || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4" />
            Setting up your wallet account...
          </div>
        ) : (
          <>
            <HeroSection />
            <div className="space-y-8">
              {features.map((feature, index) => (
                <FeatureSection key={index} {...feature} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Your Vaults</h1>
            <p className="text-xl text-gray-300">
              Manage your secure password vaults protected by blockchain technology
            </p>
          </div>

          {/* Vaults Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyVaults.map((vault) => (
              <VaultTile key={vault.id} vault={vault} />
            ))}
          </div>

          {/* Empty State */}
          {dummyVaults.length === 0 && (
            <div className="text-center py-16">
              <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">No vaults yet</h3>
              <p className="text-gray-500 mb-6">Create your first secure vault to get started</p>
              <button
                onClick={() => navigate('/new-vault')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Your First Vault
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
