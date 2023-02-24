import { Component } from '@angular/core';

import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { SigmaSubscriptions } from 'sigma-subscriptions';
import { Box, Amount, Network } from '@fleet-sdk/common';
import { WalletService } from 'src/app/wallet.service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html'
})

export class SubscribeComponent {

  constructor(private walletService: WalletService) {}

  submitting = false;
  async subscribe(serviceTokenId: string) {
    this.submitting = true;

    const manager: SigmaSubscriptions = new SigmaSubscriptions(Network.Testnet);
    debugger;
    let startDate = new Date();
    startDate.setHours(startDate.getHours() - 6);
    const tx: UnsignedTransaction = await manager.subscribe(ergo!, serviceTokenId, startDate);

    console.log(tx);
    await this.walletService.signAndSend(tx);

    this.submitting = false;
  }

}
