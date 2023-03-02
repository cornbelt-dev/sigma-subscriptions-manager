import { Injectable } from '@angular/core';
import { Network } from '@fleet-sdk/common';
import { SigmaSubscriptions } from 'sigma-subscriptions';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  explorerUrl: string;
  sigmaSubscriptions: SigmaSubscriptions;

  constructor() { 
    const network: Network = localStorage.getItem("network") ? localStorage.getItem("network") == Network.Mainnet.toString() ? Network.Mainnet : Network.Testnet : environment.envVar.Network;
    const apiUrl: string | undefined = localStorage.getItem("apiUrl") ?? environment.envVar.API_URL;
    this.sigmaSubscriptions = new SigmaSubscriptions(network, apiUrl);
    this.explorerUrl = localStorage.getItem("explorerUrl") ?? environment.envVar.ExplorerUrl;
  }

  reset() {
    this.sigmaSubscriptions.NetworkType = environment.envVar.Network;
    localStorage.removeItem("network");
    
    this.sigmaSubscriptions.API_URL = environment.envVar.API_URL;
    localStorage.removeItem("apiUrl");

    this.explorerUrl = environment.envVar.ExplorerUrl;
    localStorage.removeItem("explorerUrl");
  }

  setNetwork(network: Network) {
    this.sigmaSubscriptions.NetworkType = network;
    localStorage.setItem("network", network.toString());
  }

  setAPIUrl(apiUrl: string) {
    this.sigmaSubscriptions.API_URL = apiUrl;
    localStorage.setItem("apiUrl", apiUrl);
  }
  
  setExplorerUrl(explorerUrl: string) {
    this.explorerUrl = explorerUrl;
    localStorage.setItem("explorerUrl", explorerUrl);
  }
}