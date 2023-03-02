import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './components/manage/manager.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { DashboardComponent } from './components/dashboard.component';
import { ServiceEditComponent } from './components/manage/service-edit.component';
import { SubscribersComponent } from './components/manage/subscribers.component';
import { SubscribeComponent } from './components/subscriptions/subscribe.component';
import { PageNotFoundComponent } from './components/404-component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'service', component: ServiceEditComponent, canActivate: [AuthGuard] },
  { path: 'service/:configNFT', component: ServiceEditComponent, canActivate: [AuthGuard] },
  { path: 'subscribers/:tokenId', component: SubscribersComponent, canActivate: [AuthGuard] },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'subscribe/:tokenId', component: SubscribeComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
