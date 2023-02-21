import { Injectable, ReflectiveInjector } from '@angular/core';
import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor() { }

  wallet: EIP12ErgoAPI | undefined;

  async setWallet(wallet: EIP12ErgoAPI | undefined) {
    this.wallet = wallet;
  }

  async getWallet(connect: boolean): Promise<EIP12ErgoAPI | undefined> {

    if (ergoConnector) {
      const walletConnector = ergoConnector['nautilus'];
      if (walletConnector) {
        let connected = await walletConnector.isConnected();
        if (connected) {
          connected = await walletConnector.connect();
          this.wallet = ergo;
        } else if (connect) {
          const granted = await walletConnector.connect();
          if (granted) {
            this.wallet = await walletConnector.getContext();
          } else {
            this.wallet = undefined;
          }
        }   
      }   
    }
    return this.wallet;
  }

  async disconnectWallet(): Promise<EIP12ErgoAPI | undefined> {
    
    if (ergoConnector) {
      const walletConnector = ergoConnector['nautilus'];
      if (walletConnector) {
        const disconnected = await walletConnector.disconnect();
        if (disconnected) {
          this.wallet = undefined;
        }
      }
    }
    return this.wallet;
  }

  async signAndSend(tx: UnsignedTransaction): Promise<string> {
    const signedTx = await ergo!.sign_tx(tx);
    const txId = await ergo!.submit_tx(signedTx);
    console.log(txId);
    return txId;
  }

}
