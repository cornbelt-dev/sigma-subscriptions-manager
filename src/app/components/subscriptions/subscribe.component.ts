import { Component } from '@angular/core';

import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { WalletService } from 'src/app/services/wallet.service';
import { ManagerService } from 'src/app/services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html'
})

export class SubscribeComponent {

  constructor(private walletService: WalletService, private managerService: ManagerService, private router: Router, private route: ActivatedRoute) {}

  submitting = false;
  tokenId: string | null = null;
  txId: string | null = null;

  async ngOnInit() {
    this.tokenId = this.route.snapshot.paramMap.get('tokenId');
    if (this.tokenId == null) {
      this.nav("/");
    }
  }

  async subscribe() {
    this.submitting = true;
    const wallet = await this.walletService.getWallet();
    if (wallet && this.tokenId) {
      let startDate = new Date();
      startDate.setHours(startDate.getHours() - 24);
      const tx: UnsignedTransaction = await this.managerService.sigmaSubscriptions.subscribe(wallet, this.tokenId, startDate);
      console.log(tx);
      //const tx: UnsignedTransaction = await this.managerService.sigmaSubscriptions.subscribe(wallet, this.tokenId);
      const txId = await this.walletService.signAndSend(tx);
      if (txId) {
        this.txId = txId;
      }
    }
    this.submitting = false;
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }

  async clearTxId() {
    this.txId = null;
  }

}
