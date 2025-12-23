import './App.css'
import { Connect } from './wallet/ConnectWallet'
import { Account } from './wallet/WalletAccount'
import { Balance } from './wallet/WalletBalance'
import { CreateStablecoin } from './stablecoin/CreateNewStablecoin'

function App() {

  return (
    <div>
      <h1>Fiel</h1>
      <hr />
      <h2>Account</h2>
        <Account />
      <h2>Balance</h2>
          <Balance />
      <h2>Connect</h2>
        <Connect />
      <h2>Stablecoin</h2>
        <CreateStablecoin />
    </div>
  )
}

export default App
