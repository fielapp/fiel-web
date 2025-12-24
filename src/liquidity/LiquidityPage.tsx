import { useState } from 'react';
import { Button, StatusBadge } from '../components/ReusableComponents';
import './LiquidityStyles.css';

interface LiquidityPool {
  id: string;
  name: string;
  stablecoin: string;
  totalLiquidity: number;
  availableLiquidity: number;
  utilizationRate: number;
  apr: number;
}

interface LiquidityTransaction {
  id: string;
  type: 'add' | 'remove';
  amount: number;
  stablecoin: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export const LiquidityPage = () => {
  const [pools, setPools] = useState<LiquidityPool[]>([
    {
      id: '1',
      name: 'CUSD Pool',
      stablecoin: 'CUSD',
      totalLiquidity: 500000,
      availableLiquidity: 300000,
      utilizationRate: 40,
      apr: 5.5
    },
    {
      id: '2',
      name: 'PEUR Pool',
      stablecoin: 'PEUR',
      totalLiquidity: 300000,
      availableLiquidity: 150000,
      utilizationRate: 50,
      apr: 4.2
    }
  ]);

  const [transactions, setTransactions] = useState<LiquidityTransaction[]>([
    {
      id: '1',
      type: 'add',
      amount: 10000,
      stablecoin: 'CUSD',
      date: '2023-10-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'remove',
      amount: 5000,
      stablecoin: 'CUSD',
      date: '2023-10-10',
      status: 'completed'
    },
    {
      id: '3',
      type: 'add',
      amount: 15000,
      stablecoin: 'PEUR',
      date: '2023-10-05',
      status: 'completed'
    }
  ]);

  const [newLiquidity, setNewLiquidity] = useState({
    poolId: '1',
    amount: 0,
    action: 'add' as 'add' | 'remove'
  });

  const handleLiquidityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLiquidity(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleAddLiquidity = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction: LiquidityTransaction = {
      id: (transactions.length + 1).toString(),
      type: newLiquidity.action,
      amount: newLiquidity.amount,
      stablecoin: pools.find(p => p.id === newLiquidity.poolId)?.stablecoin || 'CUSD',
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    setTransactions([newTransaction, ...transactions]);

    // Update pool liquidity
    setPools(pools.map(pool => {
      if (pool.id === newLiquidity.poolId) {
        if (newLiquidity.action === 'add') {
          return {
            ...pool,
            totalLiquidity: pool.totalLiquidity + newLiquidity.amount,
            availableLiquidity: pool.availableLiquidity + newLiquidity.amount
          };
        } else {
          return {
            ...pool,
            totalLiquidity: pool.totalLiquidity - newLiquidity.amount,
            availableLiquidity: pool.availableLiquidity - newLiquidity.amount
          };
        }
      }
      return pool;
    }));

    setNewLiquidity({ poolId: '1', amount: 0, action: 'add' });
    alert(`Liquidity ${newLiquidity.action === 'add' ? 'added' : 'removed'} successfully!`);
  };

  return (
    <div className="liquidity-container">
      <h2>Liquidity Management</h2>

      <div className="liquidity-overview">
        <div className="overview-card">
          <h3>Total Liquidity</h3>
          <p className="overview-value">${pools.reduce((sum, pool) => sum + pool.totalLiquidity, 0).toLocaleString()}</p>
        </div>
        <div className="overview-card">
          <h3>Available Liquidity</h3>
          <p className="overview-value">${pools.reduce((sum, pool) => sum + pool.availableLiquidity, 0).toLocaleString()}</p>
        </div>
        <div className="overview-card">
          <h3>Average APR</h3>
          <p className="overview-value">{(pools.reduce((sum, pool) => sum + pool.apr, 0) / pools.length).toFixed(2)}%</p>
        </div>
      </div>

      <div className="liquidity-actions">
        <h3>Add/Remove Liquidity</h3>
        <form onSubmit={handleAddLiquidity} className="liquidity-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="poolId">Pool</label>
              <select
                id="poolId"
                name="poolId"
                value={newLiquidity.poolId}
                onChange={handleLiquidityChange}
              >
                {pools.map(pool => (
                  <option key={pool.id} value={pool.id}>{pool.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="action">Action</label>
              <select
                id="action"
                name="action"
                value={newLiquidity.action}
                onChange={handleLiquidityChange}
              >
                <option value="add">Add Liquidity</option>
                <option value="remove">Remove Liquidity</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={newLiquidity.amount}
              onChange={handleLiquidityChange}
              min="1"
              required
            />
          </div>

          <Button type="submit" variant="primary">
            {newLiquidity.action === 'add' ? 'Add Liquidity' : 'Remove Liquidity'}
          </Button>
        </form>
      </div>

      <div className="pools-section">
        <h3>Liquidity Pools</h3>
        <div className="pools-grid">
          {pools.map(pool => (
            <div key={pool.id} className="pool-card">
              <div className="pool-header">
                <h4>{pool.name}</h4>
                <span className="pool-stablecoin">{pool.stablecoin}</span>
              </div>

              <div className="pool-stats">
                <div className="stat">
                  <p className="stat-value">${pool.totalLiquidity.toLocaleString()}</p>
                  <p className="stat-label">Total Liquidity</p>
                </div>

                <div className="stat">
                  <p className="stat-value">${pool.availableLiquidity.toLocaleString()}</p>
                  <p className="stat-label">Available</p>
                </div>

                <div className="stat">
                  <p className="stat-value">{pool.utilizationRate}%</p>
                  <p className="stat-label">Utilization</p>
                </div>

                <div className="stat">
                  <p className="stat-value">{pool.apr}%</p>
                  <p className="stat-label">APR</p>
                </div>
              </div>

              <div className="utilization-bar">
                <div
                  className="utilization-fill"
                  style={{ width: `${pool.utilizationRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Stablecoin</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td className={`tx-type ${tx.type}`}>{tx.type === 'add' ? 'Add' : 'Remove'}</td>
                <td>{tx.amount.toLocaleString()}</td>
                <td>{tx.stablecoin}</td>
                <td>{tx.date}</td>
                <td><StatusBadge status={tx.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};