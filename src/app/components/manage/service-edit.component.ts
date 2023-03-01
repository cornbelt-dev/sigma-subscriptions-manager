import { Component } from '@angular/core';

import { EIP12ErgoAPI, UnsignedTransaction } from '@nautilus-js/eip12-types';
import { SigmaSubscriptions, ONE_ERG_IN_NANOERG, ServiceConfig } from 'sigma-subscriptions';
import { Box, Amount, Network } from '@fleet-sdk/common';
import { Config } from '../../service';
import { WalletService } from 'src/app/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/manager.service';
import { Pipe, PipeTransform } from '@angular/core';
import { msToTime } from 'src/app/util';

@Pipe({name: 'MillisecondToTime'})
export class MillisecondToTime implements PipeTransform {
  transform(value: number): string {
    return msToTime(value);
  }
}

@Component({
  selector: 'service-edit',
  templateUrl: './service-edit.component.html'
})

export class ServiceEditComponent {

  constructor(private walletService: WalletService, private manager: ManagerService, private router: Router, private route: ActivatedRoute) {}
  
  model: Config = new Config();
  configNFT: string | null = null;
  failToLoad: boolean = false;   
  submitting = false;
  txId: string | null = null;

  async ngOnInit() {
    this.configNFT = this.route.snapshot.paramMap.get('configNFT');
    if (this.configNFT != null) {
      await this.loadService(this.configNFT);
    } else {
      const wallet = await this.walletService.getWallet()
      if (wallet) {
        this.model.address = await wallet.get_change_address();
      }
    }
  }

  async loadService(configNFT: string) {
    try {
      const config: ServiceConfig | undefined = await this.manager.sigmaSubscriptions.getServiceConfig(configNFT);
      if (config) {
        this.model = new Config(config)
      } else {
        this.failToLoad = true;
      }
    } catch {
      this.failToLoad = true;
    }
  }

  async submitService() {
    this.submitting = true;
    const wallet = await this.walletService.getWallet();
    if (wallet) {      
      const tx: UnsignedTransaction = this.configNFT == null ?
        await this.manager.sigmaSubscriptions.createServiceConfig(wallet, this.model.map()) :
        await this.manager.sigmaSubscriptions.editServiceConfig(wallet, this.model.map());        
      const txId = await this.walletService.signAndSend(tx);
      if (txId)
      {
        this.txId = txId;
      }
    }
    this.submitting = false;
  }

  clearTxId() {
    this.txId = null;
  }
  
  setFee(fee: number) {
    this.model.fee = fee;
  }
  
  addFee(fee: number) {
    this.model.fee += fee;
  }

  setLength(length: number) {
    this.model.length = length;
  }
  
  addLength(length: number) {
    this.model.length += length;
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }
}
