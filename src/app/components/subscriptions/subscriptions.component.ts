import { Component } from '@angular/core';
import { Subscription } from 'sigma-subscriptions';
import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';
import { ManagerService } from 'src/app/services/manager.service';
import { SubscriptionDetails } from 'src/app/service';

@Component({
  selector: 'subscriptions',
  templateUrl: './subscriptions.component.html'
})

export class SubscriptionsComponent {

  model: SubscriptionDetails[] = [];
  loading: boolean = false;
  submitting: boolean = false;

  constructor(private walletService: WalletService, public managerService: ManagerService, private router: Router) { }

  async ngOnInit() {
    await this.loadSubscriptions();
  }

  async loadSubscriptions() {

    this.loading = true;
    const wallet = await this.walletService.getWallet();
    if (wallet) {
      let services: Subscription[] = await this.managerService.sigmaSubscriptions.getSubscriptionsForWallet(wallet);
      this.model = services.map(s => new SubscriptionDetails(s)).sort((a, b) => a.endDate! > b.endDate! ? -1 : a.endDate! < b.endDate! ? 1 : 0);
    }
    this.loading = false;
  }

  async cancelSubscription(subscriptionToken: string | undefined) {

    this.submitting = true;
    if (subscriptionToken) {
      const wallet = await this.walletService.getWallet();
      if (wallet) {
        let tx: UnsignedTransaction = await this.managerService.sigmaSubscriptions.cancel(wallet, subscriptionToken);
        console.log(tx);
        const txId = await this.walletService.signAndSend(tx);
        if (txId) {
          this.router.navigateByUrl("/transaction/" + txId, { state: { txType: "cancel", tx: tx }});
        }
      }
    }
    this.submitting = false;
  }

  async renewSubscription(subscriptionToken: string | undefined) {

    this.submitting = true;
    if (subscriptionToken) {
      const wallet = await this.walletService.getWallet();
      if (wallet) {
        let tx: UnsignedTransaction = await this.managerService.sigmaSubscriptions.renew(wallet, subscriptionToken);
        const txId = await this.walletService.signAndSend(tx);
        if (txId) {
          this.router.navigateByUrl("/transaction/" + txId, { state: { txType: "renew", tx: tx }});
        }
      }
    }
    this.submitting = false;
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }

}
