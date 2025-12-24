import { useState } from 'react';
import { Button, StatusBadge } from '../components/ReusableComponents';
import './PaymentsStyles.css';

interface Payment {
  id: string;
  sender: string;
  amount: number;
  stablecoin: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  txHash: string;
}

export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      sender: '0x1234...5678',
      amount: 1500,
      stablecoin: 'CUSD',
      date: '2023-10-15',
      status: 'completed',
      description: 'Payment for services',
      txHash: '0xabc123...def456'
    },
    {
      id: '2',
      sender: '0x9876...5432',
      amount: 3200,
      stablecoin: 'PEUR',
      date: '2023-10-12',
      status: 'completed',
      description: 'Product purchase',
      txHash: '0xdef456...ghi789'
    },
    {
      id: '3',
      sender: '0x5555...6666',
      amount: 750,
      stablecoin: 'CUSD',
      date: '2023-10-10',
      status: 'pending',
      description: 'Invoice payment',
      txHash: '0xghi789...jkl012'
    },
    {
      id: '4',
      sender: '0x7777...8888',
      amount: 2100,
      stablecoin: 'PEUR',
      date: '2023-10-08',
      status: 'completed',
      description: 'Consulting fee',
      txHash: '0xjkl012...mno345'
    }
  ]);

  const [filter, setFilter] = useState({
    status: 'all',
    stablecoin: 'all'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filter.status === 'all' || payment.status === filter.status;
    const matchesStablecoin = filter.stablecoin === 'all' || payment.stablecoin === filter.stablecoin;
    const matchesSearch = payment.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.txHash.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesStablecoin && matchesSearch;
  });

  const totalReceived = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="payments-container">
      <h2>Received Payments</h2>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Received</h3>
          <p className="summary-value">${totalReceived.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Completed Payments</h3>
          <p className="summary-value">{payments.filter(p => p.status === 'completed').length}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Payments</h3>
          <p className="summary-value">{payments.filter(p => p.status === 'pending').length}</p>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by sender, description, or transaction hash..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-controls">
          <select name="status" value={filter.status} onChange={handleFilterChange}>
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select name="stablecoin" value={filter.stablecoin} onChange={handleFilterChange}>
            <option value="all">All Stablecoins</option>
            <option value="CUSD">CUSD</option>
            <option value="PEUR">PEUR</option>
          </select>
        </div>
      </div>

      <div className="payments-list">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Amount</th>
              <th>Stablecoin</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td className="sender">{payment.sender}</td>
                <td className="amount">${payment.amount.toLocaleString()}</td>
                <td className="stablecoin">{payment.stablecoin}</td>
                <td>{payment.date}</td>
                <td className="description">{payment.description}</td>
                <td><StatusBadge status={payment.status} /></td>
                <td>
                  <a
                    href={`https://explore.tempo.xyz/tx/${payment.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-link"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayments.length === 0 && (
          <div className="no-results">
            No payments found matching your criteria
          </div>
        )}
      </div>

      <div className="export-section">
        <Button variant="secondary">Export Payments Data</Button>
      </div>
    </div>
  );
};