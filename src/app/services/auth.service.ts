import { Injectable } from '@angular/core';
import { EIP12ErgoAPI } from '@nautilus-js/eip12-types';
import { Observable, of } from 'rxjs';
import { SigmaSubscriptionsAuthResponse } from 'sigma-subscriptions';
import { environment } from 'src/app/environments/environment';
import { ManagerService } from 'src/app/services/manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSubscriber: boolean = false;
  
  constructor(private managerService: ManagerService) { }

  async login(wallet: EIP12ErgoAPI | undefined): Promise<Observable<boolean>> {
    
    if (wallet) {
      if (await wallet.get_change_address() == environment.envVar.AdminWalletAddress) {
        this.isSubscriber = true;
      } else {
        const response: SigmaSubscriptionsAuthResponse = await this.managerService.sigmaSubscriptions.authWallet(wallet, environment.envVar.SigmaSubscriptionTokenId);
        this.isSubscriber = response.auth;
      }
    } else {
      this.isSubscriber = false;
    }
  
    localStorage.setItem('isSubscriber', this.isSubscriber ? "true" : "false"); 

    return of(this.isSubscriber);
  }

  logout(): void {
    this.isSubscriber = false;
     localStorage.removeItem('isSubscriber'); 
  }
}
