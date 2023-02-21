import { Component, setTestabilityGetter } from '@angular/core';
import { Router } from '@angular/router';
import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html'
})

export class WalletComponent {

  wallet: EIP12ErgoAPI | undefined;
  address: string | undefined = 'Connect Wallet';
  connected: boolean = false;

  constructor(private walletService: WalletService, private router: Router) { }

  async ngOnInit() {
    this.wallet = await this.walletService.getWallet(true);
    await this.setWalletStatus();
  }

  async connectWallet() {
    this.wallet = await this.walletService.getWallet(true);
    await this.setWalletStatus();
  }

  async disconnectWallet(event: any) {    
    event.stopPropagation();
    this.wallet = await this.walletService.disconnectWallet();
    await this.setWalletStatus();
  }

  async setWalletStatus() {    
    if (this.wallet) {
      this.connected = true;
      this.address = await this.wallet.get_change_address();
    } else {
      this.connected = false;
      this.address = 'Connect Wallet';
      this.router.navigate(['./']);
    }
  }
}
