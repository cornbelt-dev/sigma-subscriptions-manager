import { Component } from '@angular/core';

import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { SigmaSubscriptions, ServiceConfig, Service, Subscription, SigmaSubscriptionsAuthResponse, LENGTH_IN_MILISECONDS, ONE_ERG_IN_NANOERG } from 'sigma-subscriptions';
import { Box, Amount, Network } from '@fleet-sdk/common';
import { Config } from '../../service';
import { WalletService } from 'src/app/wallet.service';

@Component({
  selector: 'configs',
  templateUrl: './configs.component.html'
})

export class ConfigsComponent {

  constructor(private walletService: WalletService) {}

  ergDenom = BigInt(ONE_ERG_IN_NANOERG);

  model: Config[] = [];

  manager: SigmaSubscriptions = new SigmaSubscriptions(Network.Testnet);

  async loadConfigs() {

    //let config: ServiceConfig | undefined = await this.manager.getServiceConfig('95ded16b23d84db390d9e9caa8132e55951c74e27e3e0ba861a2750aed1ce765');
    //this.model.push(new Config(config));

    const address = await ergo!.get_change_address();
    let configs: ServiceConfig[] = await this.manager.getServiceConfigs(address);
    this.model = configs.map(c => new Config(c));
  }

  newServiceConfig: string = '';
  submitting = false;
  async newService() {
    this.submitting = true;

    let manager = new SigmaSubscriptions(Network.Testnet);

    const tx: UnsignedTransaction = await manager.createService(ergo!, this.newServiceConfig);

    console.log(tx);
    await this.walletService.signAndSend(tx);

    this.submitting = false;
  }

}
