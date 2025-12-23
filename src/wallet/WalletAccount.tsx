import { useConnection, useDisconnect, useSwitchChain } from 'wagmi'
import { tempoTestnet } from 'viem/chains'
 
export function Account() {
  const account = useConnection()
  const disconnect = useDisconnect()
  const switchChain = useSwitchChain() 
 
  return (
    <div>
      <div>
        {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
      </div>
      <button onClick={() => disconnect.disconnect()}>
        Sign out
      </button>
 
      <button
        onClick={() =>
          switchChain.switchChain({ 
            chainId: tempoTestnet.id, 
            addEthereumChainParameter: { 
              nativeCurrency: { 
                name: 'USD', 
                decimals: 18, 
                symbol: 'USD', 
              }, 
            }, 
          }) 
        }
      > 
        Add {tempoTestnet.name} to wallet 
      </button> 
    </div>
  )
}