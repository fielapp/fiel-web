import { useAccount, useWatchBlockNumber } from 'wagmi'
import { Hooks } from 'tempo.ts/wagmi'
import { formatUnits } from 'viem'
import { alphaUsd } from '../config/ChainConfig'


export function Balance() {
  const account = useAccount()

  const balance = Hooks.token.useGetBalance({
    account: account.address,
    token: alphaUsd,
  })
  const metadata = Hooks.token.useGetMetadata({
    token: alphaUsd,
  })
  const addFunds = Hooks.faucet.useFund({
    mutation: {
      onSuccess() {
        balance.refetch()
      },
    },
  })

  useWatchBlockNumber({
    onBlockNumber() {
      balance.refetch()
    },
  })

  if (balance.isLoading || metadata.isLoading) return <div>Loading...</div>
  if (!balance.data && !addFunds.isSuccess)
    return (
      <button
        disabled={addFunds.isPending}
        onClick={() => addFunds.mutate({ account: account.address! })}
        type="button"
      >
        Add Funds
      </button>
    )
  return (
    <div>
      {metadata.data?.name} Balance:{' '}
      {formatUnits(balance.data ?? 0n, metadata.data?.decimals ?? 6)}
    </div>
  )
}