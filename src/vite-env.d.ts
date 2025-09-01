/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string
  readonly VITE_ETHEREUM_RPC_URL?: string
  readonly VITE_POLYGON_RPC_URL?: string
  readonly VITE_BSC_RPC_URL?: string
  readonly VITE_SEPOLIA_RPC_URL?: string
  readonly VITE_MUMBAI_RPC_URL?: string
  readonly VITE_BSC_TESTNET_RPC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}