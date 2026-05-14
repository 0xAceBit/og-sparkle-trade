# Primordial Marketplace

## Project Overview

Primordial Marketplace is a premium web3 platform for discovering, listing, and acquiring autonomous AI agents. Built entirely on the 0G Chain EVM Mainnet, it serves as a decentralized marketplace where users can browse agent listings, purchase agents with native 0G tokens, and publish their own agents directly on-chain.

The platform integrates seamlessly with 0G Chain's infrastructure, utilizing its high-throughput EVM-compatible blockchain for all transaction processing, wallet interactions, and data persistence. All agent metadata, ownership records, and transaction history are stored immutably on-chain, ensuring censorship resistance and verifiable provenance.

## System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │  Cloudflare      │    │   0G Chain      │
│   (TanStack     │◄──►│  Workers         │◄──►│   Mainnet       │
│    Router)      │    │  (SSR/Edge)      │    │   (EVM)         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   wagmi/viem    │    │  Marketplace      │    │   Smart         │
│   RainbowKit    │    │  Contract        │    │   Contract       │
│   (Web3)        │    │  (Frontend)      │    │   (0G Mainnet)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Frontend Architecture
- **Framework**: React 19 with TanStack Router for file-based routing
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: TanStack Query for server state, React Query for caching
- **Web3 Integration**: wagmi + viem for blockchain interactions, RainbowKit for wallet connection
- **Deployment**: Cloudflare Workers with TanStack Start for SSR/edge rendering

### Backend Architecture
- **Runtime**: Cloudflare Workers (serverless edge functions)
- **Data Layer**: 0G Chain Mainnet (EVM-compatible blockchain)
- **Smart Contract**: Custom marketplace contract deployed at `0x65d94cce3894f1482dc86877625f4129e4FF963A`
- **RPC Endpoint**: `https://evmrpc.0g.ai`
- **Block Explorer**: `https://chainscan.0g.ai`

### Key Components
- **Marketplace Contract**: Handles agent listings, purchases, and ownership transfers
- **Web3 Providers**: Centralized wallet connection and network management
- **Transaction Modal**: Real-time transaction tracking with wallet confirmations
- **Agent Cards**: Interactive components for browsing and purchasing agents
- **Dashboard**: User-specific view of owned agents and transaction history

## 0G Component Usage Details

### Blockchain Integration
The application uses 0G Chain as its sole blockchain layer, integrating through:
- **wagmi**: React hooks for Ethereum interactions
- **viem**: TypeScript interface for Ethereum
- **RainbowKit**: Wallet connection modal and provider

### Smart Contract Integration
- **Contract Address**: `0x65d94cce3894f1482dc86877625f4129e4FF963A`
- **Network**: 0G Mainnet (Chain ID: 16661)
- **Functions**:
  - `getAllAgents()`: Retrieves all listed agents
  - `getAgent(id)`: Gets specific agent details
  - `listAgent(name, description, category, price)`: Lists new agent
  - `purchaseAgent(id)`: Purchases agent with 0G tokens

### Problems Solved by 0G Integration
1. **Decentralized Ownership**: Agent ownership and metadata stored immutably on-chain
2. **Trustless Transactions**: Direct peer-to-peer agent purchases without intermediaries
3. **Censorship Resistance**: No platform can remove or alter agent listings
4. **Verifiable Provenance**: Complete transaction history traceable on 0G ChainScan
5. **Native Payments**: Seamless payments using 0G tokens without wrapped assets

### Network Validation
The app automatically prompts users to switch to 0G Mainnet if connected to another network, ensuring all transactions occur on the correct blockchain.

## Deployment Steps

### Prerequisites
- Node.js 18+
- npm or bun package manager
- Cloudflare account with Workers enabled
- Git repository

### Local Development Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd og-sparkle-trade
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Access the application**
   - Open `http://localhost:3000` in your browser
   - The app will run in demo mode if the contract isn't deployed

### Production Deployment
1. **Install Cloudflare CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate with Cloudflare**
   ```bash
   wrangler auth login
   ```

3. **Deploy to Cloudflare Workers**
   ```bash
   npm run build
   wrangler deploy
   ```

4. **Update contract address** (if deploying your own contract)
   - Deploy the marketplace contract to 0G Mainnet
   - Update `MARKETPLACE_ADDRESS` in `src/lib/contracts/marketplace.ts`
   - Redeploy the application

### Environment Configuration
- The app uses 0G Mainnet by default
- RPC endpoint: `https://evmrpc.0g.ai`
- Block explorer: `https://chainscan.0g.ai`
- No additional environment variables required for basic functionality

## Usage Instructions

### Browsing Agents
1. Visit the marketplace page (`/marketplace`)
2. Browse agents by category, price, or popularity
3. Use search (`Cmd/Ctrl + K`) to find specific agents
4. Toggle between grid and list views
5. Add agents to favorites for quick access

### Connecting a Wallet
1. Click "Connect Wallet" in the site header
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet
4. The app will automatically switch you to 0G Mainnet if needed

### Purchasing an Agent
1. Ensure your wallet is connected and on 0G Mainnet
2. Click on an agent card to view details
3. Click "Purchase" and confirm in your wallet
4. Track transaction progress in the modal
5. View transaction on 0G ChainScan via the provided link

### Listing an Agent
1. Navigate to `/create`
2. Fill in agent details (name, description, category, price)
3. Click "List Agent" and confirm the transaction
4. Your agent will appear in the marketplace once confirmed

### Viewing Dashboard
1. Go to `/dashboard`
2. View your owned agents and purchase history
3. Check your 0G token balance
4. Access direct links to your address on 0G ChainScan

### Demo Mode
When the marketplace contract is not deployed (address is zero), the app runs in demo mode with sample data. All UI interactions work, but transactions are simulated locally.

## Technologies Used

- **Frontend**: React 19, TypeScript, TanStack Router
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Web3**: wagmi, viem, RainbowKit
- **Backend**: Cloudflare Workers, TanStack Start
- **Blockchain**: 0G Chain Mainnet
- **Build Tools**: Vite, ESLint, Prettier

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## License

This project is open source. Please check the license file for details.