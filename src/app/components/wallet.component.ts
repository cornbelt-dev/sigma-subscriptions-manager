import { Component, Inject, Renderer2 } from '@angular/core';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html'
})

export class WalletComponent {

  class: string = "";
  wallet: EIP12ErgoAPI | undefined;
  address: string | undefined = 'Connect Wallet';
  connected: boolean = false;

  constructor(public dialog: MatDialog, 
    private renderer2: Renderer2,
    private walletService: WalletService, 
    private router: Router) { }

  async ngOnInit() {
    this.wallet = await this.walletService.getWallet();
    await this.setWalletStatus();
    
    this.walletService.requsetWalletConnectObservable.subscribe(async (redirectUrl?: string) => {
      await this.openWalletConnect(redirectUrl);
    });
    
    this.renderer2.listen("window", "ergo_wallet_disconnected", event => {
      this.disconnectWallet(event);
    });
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

  async openWalletConnect(redirectUrl?: string) {
    const dialogRef = this.dialog.open(WalletDialogComonent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.connectWallet(result);
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl);
        }
      }
    });
  }

  openAddress() {
    this.dialog.open(AddressDialogComonent, { data: { address: this.address }});
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

@Component({
  selector: 'address-dialog',
  template: `<div class="p-5 pb-4 text-center ">
                <div mat-dialog-content>
                  <p class="text-break">{{data.address}}</p>
                </div>
                <div mat-dialog-actions>
                  <button class="btn btn-dark" (click)="close()">Close</button>
                </div>
              </div>`,
})
export class AddressDialogComonent {
  constructor(public dialogRef: MatDialogRef<WalletDialogComonent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(): void {
    this.dialogRef.close();
  } 
}