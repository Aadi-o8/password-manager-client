import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VaultDetails from './pages/VaultDetails';
import NewVault from './pages/NewVault';
import AddCredential from './pages/AddCredential';
import NotFound from './pages/NotFound';

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vault/:vaultId" element={<VaultDetails />} />
            <Route path="/new-vault" element={<NewVault />} />
            <Route path="/add-credential" element={<AddCredential />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </WalletContextProvider>
  );
}

export default App;