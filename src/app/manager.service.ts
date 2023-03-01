import { Injectable } from '@angular/core';
import { Network } from '@fleet-sdk/common';
import { SigmaSubscriptions } from 'sigma-subscriptions';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  sigmaSubscriptions: SigmaSubscriptions;
  constructor() { 
    this.sigmaSubscriptions = new SigmaSubscriptions(Network.Testnet);
  } 

}
