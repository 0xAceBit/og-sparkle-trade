// Placeholder marketplace ABI — replace `MARKETPLACE_ADDRESS` with the deployed
// 0G Mainnet contract address and adjust the ABI to match your contract.
// The shape below assumes a typical agent-marketplace contract.

export const MARKETPLACE_ADDRESS =
  "0x0000000000000000000000000000000000000000" as `0x${string}`;

export const marketplaceAbi = [
  {
    type: "function",
    name: "getAllAgents",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "owner", type: "address" },
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "category", type: "string" },
          { name: "price", type: "uint256" },
          { name: "active", type: "bool" },
          { name: "sales", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getAgent",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "owner", type: "address" },
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "category", type: "string" },
          { name: "price", type: "uint256" },
          { name: "active", type: "bool" },
          { name: "sales", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "listAgent",
    stateMutability: "nonpayable",
    inputs: [
      { name: "name", type: "string" },
      { name: "description", type: "string" },
      { name: "category", type: "string" },
      { name: "price", type: "uint256" },
    ],
    outputs: [{ name: "id", type: "uint256" }],
  },
  {
    type: "function",
    name: "purchaseAgent",
    stateMutability: "payable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [],
  },
  {
    type: "event",
    name: "AgentListed",
    inputs: [
      { name: "id", type: "uint256", indexed: true },
      { name: "owner", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "AgentPurchased",
    inputs: [
      { name: "id", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
    ],
  },
] as const;

export type Agent = {
  id: bigint;
  owner: `0x${string}`;
  name: string;
  description: string;
  category: string;
  price: bigint;
  active: boolean;
  sales: bigint;
};

// Demo data shown when contract is not yet deployed (zero address).
export const DEMO_AGENTS: Agent[] = [
  {
    id: 1n,
    owner: "0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8F9012",
    name: "Atlas Research",
    description:
      "Autonomous research agent that compiles long-form market briefs from on-chain and off-chain sources.",
    category: "Research",
    price: 250000000000000000n, // 0.25 0G
    active: true,
    sales: 142n,
  },
  {
    id: 2n,
    owner: "0x9F8e7D6c5B4a3F2e1D0c9B8a7F6e5D4c3B2a1F09",
    name: "Hermes Trader",
    description:
      "Strategy agent for delta-neutral perp positions across 0G-native venues with on-chain risk caps.",
    category: "DeFi",
    price: 1500000000000000000n,
    active: true,
    sales: 38n,
  },
  {
    id: 3n,
    owner: "0xABcdEF0123456789ABcdEF0123456789ABcdEF01",
    name: "Vesta Curator",
    description:
      "Editorial agent that curates verified datasets from 0G Storage and ranks them by provenance.",
    category: "Data",
    price: 500000000000000000n,
    active: true,
    sales: 71n,
  },
  {
    id: 4n,
    owner: "0xC0FFEE0000000000000000000000000000BEEF01",
    name: "Mosaic Vision",
    description:
      "Multimodal vision agent producing structured annotations for image and video pipelines.",
    category: "Vision",
    price: 750000000000000000n,
    active: true,
    sales: 23n,
  },
  {
    id: 5n,
    owner: "0xDeadBeefCafe000000000000000000000000Beef",
    name: "Lyra Compose",
    description:
      "Long-form writing agent tuned for technical documentation with citation-grade outputs.",
    category: "Writing",
    price: 300000000000000000n,
    active: true,
    sales: 96n,
  },
  {
    id: 6n,
    owner: "0xFEEDFACE00000000000000000000000000001234",
    name: "Orion Ops",
    description:
      "Infrastructure agent that monitors validator health and proposes governance actions.",
    category: "Ops",
    price: 1200000000000000000n,
    active: true,
    sales: 12n,
  },
];
