import { Network } from "@fleet-sdk/common";

export const environment = {
    production: false,
    envVar: {
      Network: Network.Testnet,
      API_URL: "https://tn-ergo-explorer.anetabtc.io/api/v1/",
      ExplorerUrl: "https://tn-ergo-explorer.anetabtc.io/en/transactions/",
      AdminWalletAddress: "3WxYku3G2eUEpT8ZC6eJiwwr2PCxuFDd4AxPKv6zv2UuZQxjgsAE",
      SigmaSubscriptionTokenId: "37275a7d94c156d162ad0f8b783bd93ff4852fc4efca95c115bdc0976fc70adc"
    }
  };