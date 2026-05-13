## Goal

Rebuild the OG Agentic Marketplace as a fresh Lovable project: premium light/editorial UI, working wallet connect, and real on-chain reads + transactions on **0G Mainnet** (Chain ID 16661, RPC `https://evmrpc.0g.ai`, explorer `https://chainscan.0g.ai`, native token `0G`).

The existing GitHub repo is reference only — nothing syncs back to it.

---

## 1. Stack & Setup

- Add deps: `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `@tanstack/react-query` (already present).
- Configure 0G Mainnet as a custom viem `Chain` (id 16661, RPC, explorer, symbol 0G).
- Wrap `__root.tsx` with `WagmiProvider` + `RainbowKitProvider` (custom light theme matching design tokens).
- Light-mode-only design tokens in `src/styles.css` (off-white bg, near-black ink, single accent, editorial serif display + clean sans body).

## 2. Information Architecture (separate routes, not hash anchors)

```
/                  Landing — hero, featured agents, how it works
/marketplace       Browse all agents (filters, search, grid)
/agents/$id        Agent detail — description, pricing, on-chain stats, "Hire / Purchase" tx
/create            List a new agent (form → contract write)
/dashboard         User's owned/listed agents, tx history (wallet-gated)
```

Each route gets its own `head()` metadata (title, description, og tags).

## 3. Wallet & On-Chain Layer

- Header `<ConnectButton />` (RainbowKit) — shows account, balance in 0G, network switcher that prompts add/switch to 0G Mainnet if wrong chain.
- `src/lib/chains.ts` — 0G Mainnet chain definition.
- `src/lib/wagmi.ts` — wagmi config with RainbowKit connectors.
- `src/lib/contracts/` — marketplace ABI + address (placeholder constant the user fills in; if the GitHub repo contract is already deployed on mainnet, user supplies address).
- Hooks: `useAgents()` (read list via `useReadContract` / multicall), `useAgent(id)`, `usePurchaseAgent()` (`useWriteContract` + `useWaitForTransactionReceipt`), `useListAgent()`.
- All write actions show: pending toast → tx hash link to chainscan → success/failure state.

## 4. Marketplace UI (the "presentable, clean, on-chain" ask)

- **Editorial card grid**: large agent name in display serif, one-line tagline, price in 0G, owner address (truncated, link to explorer), live on-chain badge (status fetched from contract).
- **Filters bar**: category, price range, sort (newest / popular / price). State in URL search params.
- **Empty / loading / error states**: skeleton cards, empty illustration, retry on error — never blank screens.
- **Agent detail page**: two-column layout — left: long description + capabilities, right: sticky purchase card with price, owner, action button, gas hint.
- **Tx flow modal**: step indicator (Approve → Confirm → Mined), explorer link, copy hash.

## 5. Dashboard

- Wallet-gated (if not connected → ConnectButton + explainer).
- Tabs: My Agents, Purchases, Activity.
- Activity = recent tx logs filtered by user address (via `getLogs`).

## 6. Polish

- Framer Motion: subtle page transitions, card hover lift, modal spring.
- Toaster (sonner) for tx + wallet events.
- Responsive: mobile nav drawer, single-column marketplace on small screens.
- SEO: per-route metadata, semantic headings, alt text.

---

## Technical Details

- **Chain config**:
  ```ts
  export const ogMainnet = defineChain({
    id: 16661,
    name: "0G Mainnet",
    nativeCurrency: { name: "0G", symbol: "0G", decimals: 18 },
    rpcUrls: { default: { http: ["https://evmrpc.0g.ai"] } },
    blockExplorers: { default: { name: "0G ChainScan", url: "https://chainscan.0g.ai" } },
  });
  ```
- **Contract address & ABI**: I will scaffold with a placeholder ABI matching a typical marketplace (`listAgent`, `purchaseAgent`, `getAgent`, `getAllAgents`, `AgentListed`/`AgentPurchased` events). After the rebuild, you paste the deployed mainnet contract address + final ABI and I'll wire it in. If you want I can also infer the ABI from your repo's Solidity if you paste the contract file.
- **No backend needed** for v1 — all data is read directly from the contract. Lovable Cloud only added later if you want off-chain metadata caching or images.

## Open items you'll need to provide after the rebuild

1. Deployed marketplace **contract address on 0G Mainnet** (and ABI if it differs from the scaffold).
2. Any agent metadata source (IPFS URI? on-chain string? off-chain JSON?).

## Out of scope for this pass

- Pushing changes back to your GitHub repo.
- Smart contract changes/deployment.
- Off-chain indexer / search backend.

Once you approve, I'll build it end-to-end and then ask for the contract address to finalize the on-chain wiring.