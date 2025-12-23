import './App.css'
import { Connect } from './wallet/ConnectWallet'
import { Account } from './wallet/WalletAccount'

function App() {

  return (
    <div>
      <h1>Tempo Example</h1>
      <hr />
      <h2>Account</h2>
        <Account />
      <h2>Connect</h2>
        <Connect />
    </div>
  )
}

export default App
