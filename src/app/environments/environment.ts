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
        SigmaSubscriptionTokenId: "37275a7d94c156d162ad0f8b783bd93ff4852fc4efca95c115bdc0976fc70adc"
    }
  };