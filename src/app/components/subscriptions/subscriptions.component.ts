import { Component } from '@angular/core';
import { SigmaSubscriptions, Subscription } from 'sigma-subscriptions';
import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { Network } from '@fleet-sdk/common';
import { _signAndSend } from 'src/app/app.component';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/wallet.service';

@Component({
  selector: 'subscriptions',
  templateUrl: './subscriptions.component.html'
})

export class SubscriptionsComponent {

  model: Subscription[] = [];

  loading: boolean = false;
  manager: SigmaSubscriptions = new SigmaSubscriptions(Network.Testnet);

  constructor(private walletService: WalletService, private router: Router) { }

  async ngOnInit() {
    await this.loadSubscriptions();
  }

  async loadSubscriptions() {

    this.loading = true;
    const wallet = await this.walletService.getWallet(true);
    if (wallet) {
      let services: Subscription[] = await this.manager.getSubscriptionsForWallet(wallet);
      this.model = services;
    }
    this.loading = false;
  }

  async cancelSubscription(subscriptionToken: string | undefined) {

    if (subscriptionToken) {
      let tx: UnsignedTransaction = await this.manager.cancel(ergo!, subscriptionToken);
      console.log(tx);
      _signAndSend(tx);
    }
  }

  async renewSubscription(subscriptionToken: string | undefined) {

    if (subscriptionToken) {
      let tx: UnsignedTransaction = await this.manager.renew(ergo!, subscriptionToken);
      console.log(tx);
      _signAndSend(tx);
    }
  }

}
