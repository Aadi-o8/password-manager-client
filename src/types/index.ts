export interface Credential {
  id: string;
  siteName: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vault {
  id: string;
  name: string;
  description?: string;
  credentials: Credential[];
  createdAt: Date;
  updatedAt: Date;
  solanaAccount?: string;
}

export interface EncryptedVaultData {
  encryptedCredentials: string;
  salt: string;
  iv: string;
}

export interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}