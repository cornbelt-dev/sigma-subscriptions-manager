import { Network } from "@fleet-sdk/common";

// environemnt.deployment.ts
export const environment = {
    production: false,
    envVar: {
        Network: Network.Mainnet,
        API_URL: "https://api.ergoplatform.com/api/v1/",
        ExplorerUrl: "https://explorer.ergoplatform.com/en/transactions/",
        AdminWalletAddress: "3WxYku3G2eUEpT8ZC6eJiwwr2PCxuFDd4AxPKv6zv2UuZQxjgsAE",
        AdminWalletConfigNFT: "",
        SigmaSubscriptionTokenId: "79cfef3ce1202eadbe1a352c0b074ef0c01bd42287a125bd3dc3028b528b4e0a"
    }
  };