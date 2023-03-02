import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  constructor(public walletService: WalletService, private router: Router) { }

  async nav(url: string) {
    const wallet = await this.walletService.getWallet();
    if (wallet) {
      this.router.navigateByUrl(url);
    }
    else  {
      this.walletService.requestWalletConnect(url);
    }
   }
 }
