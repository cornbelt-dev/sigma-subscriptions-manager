import { Component } from '@angular/core';
import { UnsignedTransaction, SignedTransaction, Amount, Box  } from '@fleet-sdk/common';
import { ManagerService } from 'src/app/services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html'
})

export class TransactionComponent {

  constructor(private managerService: ManagerService, private router: Router, private route: ActivatedRoute) {}

  checkTxObservable: any = new Observable;
  txId: string | null = null;
  txType: string | undefined = undefined;
  tx: UnsignedTransaction | undefined = undefined;
  title: string = "Confirming Transaction";
  link: string = "";
  loading: boolean = false;
  notFound: boolean = false;
  txConfirmed: boolean = false;
  checks: number = 0;
  action: string = "";
  actionText: string = "";

  async ngOnInit() {
    this.loading = true;
    await this.loadTransaction();
    this.loading = false;
  }

  async loadTransaction() {
    this.notFound = false;
    this.checks = 0;
    this.txId = this.route.snapshot.paramMap.get('id');    
    this.txType = history.state.txType;
    this.tx = history.state.tx;
    if (this.txId) {
      this.link = this.managerService.explorerUrl + this.txId;
      this.checkTxObservable = interval(5 * 1000)
        .pipe(mergeMap(() => this.managerService.checkTxStatus(this.txId!)))
        .subscribe((result) => {
          this.checks++;
          this.updateStatus(result);
        });
      this.updateStatus(await this.managerService.checkTxStatus(this.txId));
    } else {
      this.notFound = true;
    }
  }

  updateStatus(result: number) {
    
    if (result > 0) {
      this.txConfirmed = true;
      this.checkTxObservable.unsubscribe();
    } else if (this.checks > 100) {
      this.notFound = true;
      this.checkTxObservable.unsubscribe();
    }

    switch(this.txType) {
      case 'service-create':
        this.title = this.txConfirmed ? "Service Created Successfully!" : "Creating Service";
        this.action = "/services"
        this.actionText = "Manage Services"
        break;
      case 'service-edit':
        this.title = this.txConfirmed ? "Service Edited Successfully!" : "Editing Service";
        this.action = "/services"
        this.actionText = "Manage Services"
        break;
      case 'launch':
        this.title = this.txConfirmed ? "Launched Service Successfully!" : "Launching Service";
        this.action = "/services"
        this.actionText = "Manage Services"
        break;
      case 'collect':
        this.title = this.txConfirmed ? "Fee Collected Successfully!" : "Collecting Fee";
        this.action = "/services"
        this.actionText = "Manage Services"
        break;
      case 'subscribe':
        this.title = this.txConfirmed ? "Subscribed Successfully!" : "Confirming Subscription";
        this.action = "/subscriptions"
        this.actionText = "My Subscriptions"
        break;
      case 'renew':
          this.title = this.txConfirmed ? "Renewed Successfully!" : "Renewing Subscription";
          this.action = "/subscriptions"
          this.actionText = "My Subscriptions"
          break;
      case 'cancel':
        this.title = this.txConfirmed ? "Canceled Successfully!" : "Canceling Subscription";
        this.action = "/subscriptions"
        this.actionText = "My Subscriptions"
        break;
      default:
        this.title = this.txConfirmed ? "Transaction Confirmed" : "Confirming Transaction" ;
        break;
    }
  }

  nav(url: string) {
    this.router.navigateByUrl(url);   
  }

}
