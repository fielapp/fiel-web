
import { Hooks } from 'tempo.ts/wagmi'
import {GrantTokenRoles} from './GrantTokenRoles'

export function CreateStablecoin() {
  const create = Hooks.token.useCreateSync()

  return (
    <div>
      <h2>Create Stablecoin</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.target as HTMLFormElement)
          const name = formData.get('name') as string
          const symbol = formData.get('symbol') as string
          create.mutate({
            name,
            symbol,
            currency: 'USD',
          })
        }}
      >
        <input type="text" name="name" placeholder="jakeUSD" required />
        <input type="text" name="symbol" placeholder="JUSD" required />
        <button disabled={create.isPending} type="submit">
          {create.isPending ? 'Creating...' : 'Create'}
        </button>
      </form>
      {create.isError && (
        <div style={{ color: 'red' }}>Error: {create.error?.message}</div>
      )}
      {create.data && (
        <div>
          {create.data.name} created successfully!{' '}
          <a
            href={`https://explore.tempo.xyz/tx/${create.data.receipt.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View receipt
          </a>
        </div>
      )}

      {create.data?.token && (
        <GrantTokenRoles
          token={create.data.token}
          roles={['issuer', 'pause', 'unpause', 'burnBlocked']}
        />
      )}
    </div>
  )
}