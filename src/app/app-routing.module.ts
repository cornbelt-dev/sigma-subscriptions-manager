import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './components/manage/manager.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { DashboardComponent } from './components/dashboard.component';
import { ServiceEditComponent } from './components/manage/service-edit.component';
import { SubscribersComponent } from './components/manage/subscribers.component';
import { SubscribeComponent } from './components/subscriptions/subscribe.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'service', component: ServiceEditComponent },
  { path: 'service/:configNFT', component: ServiceEditComponent },
  { path: 'subscribers/:tokenId', component: SubscribersComponent },
  { path: 'subscribe/:tokenId', component: SubscribeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
