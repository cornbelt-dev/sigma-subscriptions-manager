import { Network } from "@fleet-sdk/common";

export const environment = {
    production: false,
    envVar: {
      Network: Network.Testnet,
      API_URL: "https://tn-ergo-explorer.anetabtc.io/api/v1/"
    }
  };