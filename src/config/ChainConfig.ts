import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'viem/chains'
import { metaMask } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
 
export const config = createConfig({
  chains: [tempoTestnet],
  connectors: [metaMask()], 
  multiInjectedProviderDiscovery: true, 
  transports: {
    [tempoTestnet.id]: http(),
  },
})


export const pathUsd = '0x20c0000000000000000000000000000000000000'
export const alphaUsd = '0x20c0000000000000000000000000000000000001'
