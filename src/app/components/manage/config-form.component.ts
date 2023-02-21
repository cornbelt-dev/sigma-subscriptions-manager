import { Component } from '@angular/core';

import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { SigmaSubscriptions, ServiceConfig, Service, Subscription, SigmaSubscriptionsAuthResponse, LENGTH_IN_MILISECONDS, ONE_ERG_IN_NANOERG } from 'sigma-subscriptions';
import { Box, Amount, Network } from '@fleet-sdk/common';
import { Config } from '../../service';
import { _signAndSend } from '../../app.component';

@Component({
  selector: 'config-form',
  templateUrl: './config-form.component.html'
})

export class ConfigFormComponent {

  ergDenom = BigInt(ONE_ERG_IN_NANOERG);

  model: Config = new Config();

  newConfig() {
    this.model = new Config();
  }

  submitted = false;
   
  submitting = false;

  async configSubmit() {

    this.submitting = true;

    let manager = new SigmaSubscriptions(Network.Testnet);
    
    const tx: UnsignedTransaction = await manager.editServiceConfig(ergo!, this.model.map());

    console.log(tx);
    await _signAndSend(tx);

    this.submitting = false;
    this.submitted = true;
  }

  //async onSubmit() {

  //  this.submitting = true;

  //  const connected = await _connectWallet();
  //  if (!connected)
  //    return;
  //  debugger;

  //  const serviceConfigNFT = "a03c1503ab91a256ee9d256bd8cb3866c2803c2cca1450c33ced5f142d7b4cd7";
  //  const serviceTokenId = "0c5b3144f8db88ce0fd78c0a7fd5f5681f4bc26382c6c4c0a964d99c14fb78c3";
  //  const subscriberBoxId = "2128567ba692bac62bce7c0d631e09862dbbb78e6cf5ee02154ecdf12e7b521e";

  //  let manager = new SigmaSubscriptions(Network.Testnet);

  //  const tx: UnsignedTransaction = await manager.createServiceConfig(ergo!, this.model.map());

  //  const tx2: UnsignedTransaction = await manager.editServiceConfig(ergo!, this.model.map());

  //  const tx3: UnsignedTransaction = await manager.createService(ergo!, serviceConfigNFT, "100")

  //  const tx4: UnsignedTransaction = await manager.subscribe(ergo!, serviceTokenId);

  //  const tx5: UnsignedTransaction = await manager.renew(ergo!, serviceTokenId);

  //  const tx6: UnsignedTransaction = await manager.cancel(ergo!, serviceTokenId);

  //  const tx7: UnsignedTransaction = await manager.collect(ergo!, subscriberBoxId);

  //  const subs: Subscription[] = await manager.getSubscriptions(serviceTokenId);

  //  const auth: SigmaSubscriptionsAuthResponse = await manager.auth(serviceTokenId);

  //  const authWallet: SigmaSubscriptionsAuthResponse = await manager.authWallet(ergo!, serviceTokenId);


  //  console.log(tx);
  //  _signAndSend(tx);

  //  this.submitted = true;
  //}
}
