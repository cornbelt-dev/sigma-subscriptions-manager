import { Injectable } from '@angular/core';
import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor() { }

  connectedWallet : "nautilus" | "safew" | string | undefined = localStorage.getItem("connectedWallet") ?? undefined;

  wallet: EIP12ErgoAPI | undefined;

  async setWallet(wallet: EIP12ErgoAPI | undefined) {
    this.wallet = wallet;
  }

  async getWallet(): Promise<EIP12ErgoAPI | undefined> {
    if (this.wallet) {
      return this.wallet;
    }
    if (this.connectedWallet) {
      this.setWallet(await this.connect(this.connectedWallet));
    }
    return this.wallet;
  }

  async connect(wallet: "nautilus" | "safew" | string): Promise<EIP12ErgoAPI | undefined> {
  
    this.wallet = undefined;
    if (ergoConnector) {
      const walletConnector = ergoConnector[wallet];
      if (walletConnector) {
        let connected = await walletConnector.isConnected();
        if (connected) {
          connected = await walletConnector.connect();
          this.wallet = ergo;
        } else {
          const granted = await walletConnector.connect();
          if (granted) {
            this.wallet = await walletConnector.getContext();
            localStorage.setItem("connectedWallet", wallet);
          } else {
            this.wallet = undefined;
          }
        }   
      }   
    }
    return this.wallet;
  }

  async disconnect(): Promise<EIP12ErgoAPI | undefined> {
    
    const connector =
      ergoConnector && this.connectedWallet ? ergoConnector[this.connectedWallet] : undefined;

    if (connector) {
      await connector.disconnect();
    }

    this.wallet = undefined;
    this.connectedWallet = undefined;
    localStorage.removeItem("connectedWallet");
    return this.wallet;
  }

  async signAndSend(tx: UnsignedTransaction): Promise<string> {
    const signedTx = await ergo!.sign_tx(tx);
    const txId = await ergo!.submit_tx(signedTx);
    console.log(txId);
    return txId;
  }

}