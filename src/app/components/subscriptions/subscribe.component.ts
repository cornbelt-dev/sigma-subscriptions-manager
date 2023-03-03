import { Component } from '@angular/core';

import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { WalletService } from 'src/app/services/wallet.service';
import { ManagerService } from 'src/app/services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html'
})

export class SubscribeComponent {

  constructor(private walletService: WalletService, private managerService: ManagerService, private router: Router, private route: ActivatedRoute) {}

  service: SubscriptionService = new SubscriptionService();
  loading: boolean = false;
  submitting: boolean = false;
  tokenId: string | null = null;

  async ngOnInit() {
    this.loading = true;
    this.tokenId = this.route.snapshot.paramMap.get('tokenId');
    if (this.tokenId) {
      this.service = new SubscriptionService(await this.managerService.sigmaSubscriptions.getServiceByTokenId(this.tokenId));
    } else {
      this.nav("/");
    }
    this.loading = false;
  }

  async subscribe() {
    this.submitting = true;
    const wallet = await this.walletService.getWallet();
    if (wallet && this.tokenId) {
      //let startDate = new Date();
      //startDate.setDate(startDate.getDate() - 10);
      //const tx: UnsignedTransaction = await this.managerService.sigmaSubscriptions.subscribe(wallet, this.tokenId, startDate);
      // console.log(tx);
       const tx: UnsignedTransaction = await this.managerService.sigmaSubscriptions.subscribe(wallet, this.tokenId);
      const txId = await this.walletService.signAndSend(tx);
      if (txId) {
        this.router.navigateByUrl("/transaction/" + txId, { state: { txType: "subscribe", tx: tx }});
      }
    }
    this.submitting = false;
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }

}
