// Toggle the three cases with env vars (see package.json scripts):
//   npm run dev             -> top-level `vite.ssr` set   (bug: client include is emptied)
//   npm run dev:no-ssr      -> no `vite.ssr`              (expected: client include has `dayjs`)
//   npm run dev:workaround  -> `vite.$server` instead     (workaround: client include has `dayjs`)
const withoutViteSsr = !!process.env.WITHOUT_VITE_SSR
const useServerWorkaround = !!process.env.USE_SERVER_WORKAROUND

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },

  vite: {
    optimizeDeps: {
      include: ['dayjs'],
    },
    ...(withoutViteSsr || useServerWorkaround
      ? {}
      : { ssr: { noExternal: ['dayjs'] } }),
    ...(useServerWorkaround
      ? { $server: { resolve: { noExternal: ['dayjs'] } } }
      : {}),
  },

  hooks: {
    'vite:serverCreated' (server, { isClient }) {
      if (!isClient) return
      const env = server.environments.client
      console.log('[repro] client optimizeDeps.include =', JSON.stringify(env.config.optimizeDeps.include))
    },
  },
})
