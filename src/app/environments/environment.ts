import { Network } from "@fleet-sdk/common";

// environemnt.deployment.ts
export const environment = {
    production: false,
    envVar: {
        Network: Network.Mainnet,
        API_URL: "https://api.ergoplatform.com/api/v1/"
    }
  };