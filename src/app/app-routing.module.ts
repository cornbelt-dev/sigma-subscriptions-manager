import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { DashboardComponent } from './components/dashboard.component';
import { ServiceEditComponent } from './components/services/service-edit.component';
import { SubscribersComponent } from './components/services/subscribers.component';
import { SubscribeComponent } from './components/subscriptions/subscribe.component';
import { PageNotFoundComponent } from './components/404-component';
import { AuthGuard } from './auth.guard';
import { TransactionComponent } from './components/transaction.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'service', component: ServiceEditComponent, canActivate: [AuthGuard] },
  { path: 'service/:configNFT', component: ServiceEditComponent, canActivate: [AuthGuard] },
  { path: 'subscribers/:tokenId', component: SubscribersComponent, canActivate: [AuthGuard] },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'subscribe/:tokenId', component: SubscribeComponent },
  { path: 'transaction/:id', component: TransactionComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
