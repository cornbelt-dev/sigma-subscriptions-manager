import { Network } from "@fleet-sdk/common";

export const environment = {
    production: false,
    envVar: {
      Network: Network.Testnet,
      API_URL: "https://tn-ergo-explorer.anetabtc.io/api/v1/",
      ExplorerUrl: "https://tn-ergo-explorer.anetabtc.io/en/transactions/",
      AdminWalletAddress: "3WxYku3G2eUEpT8ZC6eJiwwr2PCxuFDd4AxPKv6zv2UuZQxjgsAE",
      AdminWalletConfigNFT: "",
      SigmaSubscriptionTokenId: "b22e5ae8c4ddcbddd6856f4e4543cdf7565bc6d6656f7eeb1548ac17692881cf"
    }
  };