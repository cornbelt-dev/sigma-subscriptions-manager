import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private router: Router) { }

  wallet: EIP12ErgoAPI | undefined;

  loading = false;
  connected = false;
  address: string | undefined;

}



export async function _signAndSend(tx: UnsignedTransaction) {
  const signedTx = await ergo!.sign_tx(tx);
  const txId = await ergo!.submit_tx(signedTx);
  console.log(txId);
  return txId;
}
