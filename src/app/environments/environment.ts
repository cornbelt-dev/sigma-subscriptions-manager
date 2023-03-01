import { Network } from "@fleet-sdk/common";

// environemnt.deployment.ts
export const environment = {
    production: false,
    baseUrl: "http://localhost:4200",
    envVar: {
        Network: Network.Testnet,
        API_URL: "https://tn-ergo-explorer.anetabtc.io/api/v1/"
    }
  };