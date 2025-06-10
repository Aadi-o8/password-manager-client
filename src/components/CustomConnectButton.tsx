import React from 'react';
import { useWalletContext } from '../context/WalletContext';

const CustomConnectButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { connecting, createAndConnect } = useWalletContext();

  return (
    <button
      onClick={createAndConnect}
      disabled={connecting}
      className={`px-4 py-2 text-white ${className}`}
    >
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default CustomConnectButton;
