import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './components/manage/manager.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { DashboardComponent } from './components/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'subscriptions', component: SubscriptionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
