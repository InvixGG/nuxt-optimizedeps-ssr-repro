# Nuxt: top-level `vite.ssr` empties the client's `optimizeDeps.include`

```sh
npm install
npm run dev              # vite.ssr.noExternal set      -> [repro] client optimizeDeps.include = []
npm run dev:no-ssr       # no vite.ssr                  -> [repro] client optimizeDeps.include = ["dayjs"]
npm run dev:workaround   # vite.$server.resolve.noExternal -> [repro] client optimizeDeps.include = ["dayjs"]
```

Delete `node_modules/.cache` between runs for a cold optimizer start. Run with
`DEBUG=vite:deps` and open the page: in the first case Vite logs
`new dependencies found: dayjs` and runs the optimizer again.
