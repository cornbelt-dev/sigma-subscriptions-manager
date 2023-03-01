import { Network } from "@fleet-sdk/common";

// environemnt.deployment.ts
export const environment = {
    production: true,
    baseUrl: "http://localhost:4200",
    envVar: {
      Network: Network.Mainnet,
      API_URL: "https://api.ergoplatform.com/api/v1/"
    }
  };