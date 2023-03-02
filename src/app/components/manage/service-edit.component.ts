import { Component } from '@angular/core';

import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { ServiceConfig } from 'sigma-subscriptions';
import { Config } from 'src/app/service';
import { WalletService } from 'src/app/services/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
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
        this.router.navigateByUrl("/transaction/" + txId, { state: { txType: this.configNFT == null ? "service-create" : "service-edit", tx: tx }});
      }
    }
    this.submitting = false;
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
