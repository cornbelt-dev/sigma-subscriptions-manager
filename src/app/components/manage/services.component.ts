import { Component } from '@angular/core';

import { Service, ServiceConfig } from 'sigma-subscriptions';
import { Config, SubscriptionService } from 'src/app/service';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'services',
  templateUrl: './services.component.html'
})

export class ServicesComponent {

  constructor(private walletService: WalletService, private manager: ManagerService, private router: Router) { }

  services: SubscriptionService[] = [];
  loading: boolean = false;
  launching: boolean = false;
  txId: string | null = null;
  
  async ngOnInit() {
    await this.loadServices();
  }

  async loadServices() {
    this.loading = true;
    const wallet = await this.walletService.getWallet();
    if (wallet) {
      const address = await wallet.get_change_address();
      let activeServices: Service[] = await this.manager.sigmaSubscriptions.getServicesByAddress(address);      
      let services: SubscriptionService[] = activeServices.map(s => new SubscriptionService(s));
      
      let configs: ServiceConfig[] = await this.manager.sigmaSubscriptions.getServiceConfigs(address);
      configs.forEach(function(config) {
        if (activeServices.findIndex(s => s.config.configNFT == config.configNFT) < 0) {
          services.push({ config: new Config(config), tokenId: undefined })
        }
      });
      this.services = services.sort((a, b) => a.config.name < b.config.name ? -1 : a.config.name > b.config.name ? 1 : 0);
    }
    this.loading = false;
  }

  async launchService(configNFT: string) {
    this.launching = true;
    const wallet = await this.walletService.getWallet();
    if (wallet) {
      const address = await wallet.get_change_address();
      const tx = await this.manager.sigmaSubscriptions.createService(wallet, configNFT);
      const txId = await this.walletService.signAndSend(tx);
      if (txId)
      {
        this.txId = txId;
      }
    }
    this.launching = false;
  }

  newService() {
    this.router.navigateByUrl("/service");
  }

  editService(configNFT: string) {
    this.router.navigateByUrl("/service/" + configNFT);
  }

  async clearTxId() {
    this.txId = null;
    await this.loadServices();
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }

}