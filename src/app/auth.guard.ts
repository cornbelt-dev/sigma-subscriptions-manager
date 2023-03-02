import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {} 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;
      return this.checkSubscription(url);
  }

  checkSubscription(url: string): true | UrlTree {
     console.log("Url: " + url)
     let isSubscriber: string | null = localStorage.getItem('isSubscriber');

     if(isSubscriber != null && isSubscriber == "true"){
        return true;
     } else {
        return this.router.parseUrl('/subscribe/' + environment.envVar.SigmaSubscriptionTokenId);
     }
  }
  
}
