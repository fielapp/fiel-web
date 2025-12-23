import { useConnect, useConnectors } from 'wagmi'
 
export function Connect() {
  const connect = useConnect()
  const connectors = useConnectors()
 
  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect.connect({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}