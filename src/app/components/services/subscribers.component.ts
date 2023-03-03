import { Component } from '@angular/core';
import { Subscription } from 'sigma-subscriptions';
import { UnsignedTransaction } from '@nautilus-js/eip12-types';
import { WalletService } from 'src/app/services/wallet.service';
import { ManagerService } from 'src/app/services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'subscribers',
  templateUrl: './subscribers.component.html'
})

export class SubscribersComponent {

  constructor(private walletService: WalletService, private manager: ManagerService, private router: Router, private route: ActivatedRoute) {}

  tokenId: string | null = null;
  subscribers: Subscription[] = [];
  expiredSubscribers: Subscription[] = [];
  title: string = "";
  titleExpired: string = "";
  loading: boolean = false;
  submitting: boolean = false;

  async ngOnInit() {
    this.tokenId = this.route.snapshot.paramMap.get('tokenId');
    if (this.tokenId != null) {
      await this.loadSubscriptions();
    } else {
      this.router.navigateByUrl("/services");      
    }
  }

  async loadSubscriptions() {
    this.loading = true;
    if (this.tokenId) {
      const subscriptions: Subscription[] = await this.manager.sigmaSubscriptions.getSubscriptions(this.tokenId);
      this.subscribers = subscriptions.filter(s => !s.expired);
      if (this.subscribers.length > 0) {
        this.title = this.subscribers.length + " Active Subscriber" + (this.subscribers.length > 1 ?"s":"") + " to " + this.subscribers[0].service.config.name;
      }
      this.expiredSubscribers = subscriptions.filter(s => s.expired);
      if (this.expiredSubscribers.length > 0) {
        this.titleExpired = this.expiredSubscribers.length + " Expired Subscription" + (this.expiredSubscribers.length > 1 ?"s":"") + " ready to collect";
      }
    } else {
      this.router.navigateByUrl("/services");      
    }
    this.loading = false;
  }

  async collectSubscription(boxId: string) {    
    this.submitting = true;
    const wallet = await this.walletService.getWallet();
    if (wallet) {    
      let tx: UnsignedTransaction = await this.manager.sigmaSubscriptions.collect(wallet, boxId);
      const txId = await this.walletService.signAndSend(tx);
      if (txId)
      {
        this.router.navigateByUrl("/transaction/" + txId, { state: { txType: "collect", tx: tx }});
      }
    }
    this.submitting = false;
  }
  
  async collectAll() {
    this.submitting = true;
    const wallet = await this.walletService.getWallet();
    if (wallet) {    
      const boxIds = this.expiredSubscribers.map(s => s.boxId);
      let tx: UnsignedTransaction = await this.manager.sigmaSubscriptions.collectBulk(wallet, boxIds);
      console.log(tx);
      const txId = await this.walletService.signAndSend(tx);
      if (txId)
      {
        this.router.navigateByUrl("/transaction/" + txId, { state: { txType: "collect", tx: tx }});
      }
    }
    this.submitting = false;
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }

}
