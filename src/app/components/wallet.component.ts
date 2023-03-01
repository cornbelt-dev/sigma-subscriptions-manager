import { Component, Optional } from '@angular/core';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog, private walletService: WalletService, private router: Router) { }

  async ngOnInit() {
    this.wallet = await this.walletService.getWallet();
    await this.setWalletStatus();
  }

  async connectWallet(wallet: string) {
    this.wallet = await this.walletService.connect(wallet);
    await this.setWalletStatus();
  }

  async disconnectWallet(event: any) {    
    event.stopPropagation();
    this.wallet = await this.walletService.disconnect();
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

  openWalletConnect() {
    const dialogRef = this.dialog.open(WalletDialogComonent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.connectWallet(result)
      }
    });
  }

}

@Component({
  selector: 'wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
})
export class WalletDialogComonent {

  constructor(public dialogRef: MatDialogRef<WalletDialogComonent>) {}

  onSelect(wallet: string): void {
    this.dialogRef.close(wallet);
  } 

}