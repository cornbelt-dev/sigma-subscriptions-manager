import { Component } from '@angular/core';

import { SigmaSubscriptions, Service, ONE_ERG_IN_NANOERG } from 'sigma-subscriptions';
import { Network } from '@fleet-sdk/common';
import { Config, SubscriptionService } from '../../service';

@Component({
  selector: 'services',
  templateUrl: './services.component.html'
})

export class ServicesComponent {

  ergDenom = BigInt(ONE_ERG_IN_NANOERG);

  model: SubscriptionService[] = [];

  manager: SigmaSubscriptions = new SigmaSubscriptions(Network.Testnet);

  async loadServices() {
    const address = await ergo!.get_change_address();
    let services: Service[] = await this.manager.getServicesByAddress(address);
    this.model = services.map(s => new SubscriptionService(s));
  }

}
