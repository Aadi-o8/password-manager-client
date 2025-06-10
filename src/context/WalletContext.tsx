import React, { createContext, useContext, useState } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  WalletContextState,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { WalletAdapter } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import type { SignerWalletAdapter } from '@solana/wallet-adapter-base';


import '@solana/wallet-adapter-react-ui/styles.css';

type CustomWalletContextType = {
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  connect: WalletContextState['connect'];
  disconnect: WalletContextState['disconnect'];
  wallet: SignerWalletAdapter | null; // ✅ Make this SignerWalletAdapter
};

const WalletContext = createContext<CustomWalletContextType | undefined>(undefined);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletContextProvider');
  }
  return context;
};

const WalletContextInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    publicKey,
    connected,
    connecting,
    connect,
    disconnect,
    wallet,
  } = useWallet();

  const contextValue: CustomWalletContextType = {
    connected,
    publicKey: publicKey?.toString() || null,
    connecting,
    connect,
    disconnect,
    wallet: wallet?.adapter as SignerWalletAdapter || null,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const [wallets] = useState(() => [new PhantomWalletAdapter()]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextInner>
            {children}
          </WalletContextInner>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
