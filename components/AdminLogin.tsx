'use client'

import { useState } from 'react'

export default function AdminLogin({
  onSubmit,
}: {
  onSubmit: (password: string) => string | null
}) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const message = onSubmit(password)
    setError(message ?? '')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-5 rounded-3xl border border-graphite-200 bg-snow p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-princeton-orange-700">Counter</p>
        <h1 className="mt-2 text-3xl font-semibold text-graphite">Sign in</h1>
        <p className="mt-2 text-sm text-graphite-600">
          The shop counter is separate from the storefront.
        </p>
      </div>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-graphite">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          className="w-full rounded-xl border border-graphite-200 bg-graphite-50 px-4 py-3 text-sm text-graphite focus:outline-none focus:ring-2 focus:ring-steel-blue"
        />
      </label>
      {error && <p className="text-sm text-burnt-caramel-700">{error}</p>}
      <button
        type="submit"
        className="rounded-full bg-princeton-orange px-6 py-3 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
      >
        Open the counter
      </button>
    </form>
  )
}
