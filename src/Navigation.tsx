import { useState } from 'react';
import { ProfilePage } from './profile/ProfilePage';
import { StablecoinPage } from './stablecoin/StablecoinPage';
import { LiquidityPage } from './liquidity/LiquidityPage';
import { PaymentsPage } from './payments/PaymentsPage';
import { Connect } from './wallet/ConnectWallet';
import { Account } from './wallet/WalletAccount';
import { Balance } from './wallet/WalletBalance';
import { CreateStablecoin } from './stablecoin/CreateNewStablecoin';

const Navigation = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'profile':
        return <ProfilePage />;
      case 'stablecoin':
        return <StablecoinPage />;
      case 'liquidity':
        return <LiquidityPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'wallet':
        return (
          <div>
            <h2>Account</h2>
            <Account />
            <h2>Balance</h2>
            <Balance />
            <h2>Connect</h2>
            <Connect />
            <h2>Stablecoin Creation</h2>
            <CreateStablecoin />
          </div>
        );
      default:
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <p>Welcome to Fiel - Stablecoin Management Platform</p>
            <p>Select a module from the navigation menu to get started.</p>
            
            <div className="dashboard-cards">
              <div className="dashboard-card" onClick={() => setActiveModule('profile')}>
                <h3>Profile Management</h3>
                <p>Configure your company profile and settings</p>
              </div>
              
              <div className="dashboard-card" onClick={() => setActiveModule('stablecoin')}>
                <h3>Stablecoin Management</h3>
                <p>Create and manage your stablecoins</p>
              </div>
              
              <div className="dashboard-card" onClick={() => setActiveModule('liquidity')}>
                <h3>Liquidity Management</h3>
                <p>Manage liquidity pools for your stablecoins</p>
              </div>
              
              <div className="dashboard-card" onClick={() => setActiveModule('payments')}>
                <h3>Received Payments</h3>
                <p>View and track payments received</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Fiel</h1>
        <nav className="main-nav">
          <button 
            className={activeModule === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveModule('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeModule === 'profile' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveModule('profile')}
          >
            Profile
          </button>
          <button 
            className={activeModule === 'stablecoin' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveModule('stablecoin')}
          >
            Stablecoins
          </button>
          <button 
            className={activeModule === 'liquidity' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveModule('liquidity')}
          >
            Liquidity
          </button>
          <button 
            className={activeModule === 'payments' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveModule('payments')}
          >
            Payments
          </button>
          <button 
            className={activeModule === 'wallet' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveModule('wallet')}
          >
            Wallet
          </button>
        </nav>
      </header>
      
      <main className="main-content">
        {renderModule()}
      </main>
    </div>
  );
};

export default Navigation;