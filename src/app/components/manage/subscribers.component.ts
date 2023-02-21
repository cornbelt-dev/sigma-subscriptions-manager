import { Component } from '@angular/core';
import { SigmaSubscriptions, Subscription } from 'sigma-subscriptions';
import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { Network } from '@fleet-sdk/common';
import { _signAndSend } from '../../app.component';

@Component({
  selector: 'subscribers',
  templateUrl: './subscribers.component.html'
})

export class SubscribersComponent {

  model: Subscription[] = [];

  manager: SigmaSubscriptions = new SigmaSubscriptions(Network.Testnet);

  async loadSubscriptions(serviceTokenId: string) {
    let subscriptions: Subscription[] = await this.manager.getSubscriptions(serviceTokenId);
    this.model = subscriptions;
  }

  async collectSubscription(boxId: string) {
    let tx: UnsignedTransaction = await this.manager.collect(ergo!, boxId);
    console.log(tx);
    _signAndSend(tx);
  }

}
