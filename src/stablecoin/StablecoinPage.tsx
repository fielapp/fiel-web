import { useState } from 'react';
import { Button, StatusBadge } from '../components/ReusableComponents';
import './StablecoinStyles.css';

interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  issuer: string;
  createdAt: string;
  status: 'active' | 'paused' | 'frozen';
}

interface Permission {
  id: string;
  name: string;
  description: string;
  assigned: boolean;
}

export const StablecoinPage = () => {
  const [stablecoins, setStablecoins] = useState<Stablecoin[]>([
    {
      id: '1',
      name: 'Company USD',
      symbol: 'CUSD',
      totalSupply: 1000000,
      issuer: '0x1234...5678',
      createdAt: '2023-05-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Project Euro',
      symbol: 'PEUR',
      totalSupply: 500000,
      issuer: '0x1234...5678',
      createdAt: '2023-07-22',
      status: 'active'
    }
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: '1', name: 'Mint', description: 'Permission to create new tokens', assigned: true },
    { id: '2', name: 'Burn', description: 'Permission to destroy tokens', assigned: true },
    { id: '3', name: 'Pause', description: 'Permission to pause token transfers', assigned: false },
    { id: '4', name: 'Upgrade', description: 'Permission to upgrade contract', assigned: false },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStablecoin, setNewStablecoin] = useState({
    name: '',
    symbol: '',
    initialSupply: 0
  });

  const handleCreateStablecoin = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoin: Stablecoin = {
      id: (stablecoins.length + 1).toString(),
      name: newStablecoin.name,
      symbol: newStablecoin.symbol,
      totalSupply: newStablecoin.initialSupply,
      issuer: '0x1234...5678',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setStablecoins([...stablecoins, newCoin]);
    setNewStablecoin({ name: '', symbol: '', initialSupply: 0 });
    setShowCreateForm(false);
    alert(`Stablecoin ${newStablecoin.name} created successfully!`);
  };

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p =>
      p.id === id ? { ...p, assigned: !p.assigned } : p
    ));
  };

  return (
    <div className="stablecoin-container">
      <h2>Stablecoin Management</h2>

      <div className="actions-bar">
        <Button
          variant="success"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create New Stablecoin'}
        </Button>
      </div>

      {showCreateForm && (
        <div className="create-form">
          <h3>Create New Stablecoin</h3>
          <form onSubmit={handleCreateStablecoin}>
            <div className="form-group">
              <label htmlFor="name">Stablecoin Name</label>
              <input
                type="text"
                id="name"
                value={newStablecoin.name}
                onChange={(e) => setNewStablecoin({...newStablecoin, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="symbol">Symbol</label>
              <input
                type="text"
                id="symbol"
                value={newStablecoin.symbol}
                onChange={(e) => setNewStablecoin({...newStablecoin, symbol: e.target.value})}
                required
                maxLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="initialSupply">Initial Supply</label>
              <input
                type="number"
                id="initialSupply"
                value={newStablecoin.initialSupply}
                onChange={(e) => setNewStablecoin({...newStablecoin, initialSupply: Number(e.target.value)})}
                required
                min="1"
              />
            </div>

            <Button type="submit" variant="primary">Create Stablecoin</Button>
          </form>
        </div>
      )}

      <div className="stablecoin-list">
        <h3>Existing Stablecoins</h3>
        {stablecoins.map(coin => (
          <div key={coin.id} className="stablecoin-card">
            <div className="stablecoin-header">
              <h4>{coin.name} ({coin.symbol})</h4>
              <StatusBadge status={coin.status} />
            </div>
            <div className="stablecoin-details">
              <p><strong>Total Supply:</strong> {coin.totalSupply.toLocaleString()}</p>
              <p><strong>Issuer:</strong> {coin.issuer}</p>
              <p><strong>Created:</strong> {coin.createdAt}</p>
            </div>
            <div className="stablecoin-actions">
              <Button variant="secondary">Manage</Button>
              <Button variant="secondary">View Contract</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="permissions-section">
        <h3>Stablecoin Permissions</h3>
        <div className="permissions-grid">
          {permissions.map(permission => (
            <div key={permission.id} className="permission-card">
              <h4>{permission.name}</h4>
              <p>{permission.description}</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={permission.assigned}
                  onChange={() => togglePermission(permission.id)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};