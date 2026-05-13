import { defineChain } from "viem";

export const ogMainnet = defineChain({
  id: 16661,
  name: "0G Mainnet",
  nativeCurrency: { name: "0G", symbol: "0G", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://evmrpc.0g.ai"] },
  },
  blockExplorers: {
    default: { name: "0G ChainScan", url: "https://chainscan.0g.ai" },
  },
  testnet: false,
});

export const explorerTx = (hash: string) =>
  `https://chainscan.0g.ai/tx/${hash}`;
export const explorerAddress = (addr: string) =>
  `https://chainscan.0g.ai/address/${addr}`;
