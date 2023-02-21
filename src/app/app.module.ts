import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { WalletComponent } from './components/wallet.component';
import { ManagerComponent } from './components/manage/manager.component';
import { ConfigsComponent } from './components/manage/configs.component';
import { ServicesComponent } from './components/manage/services.component';
import { SubscribersComponent } from './components/manage/subscribers.component';
import { ConfigFormComponent } from './components/manage/config-form.component';
import { SubscribeComponent } from './components/subscriptions/subscribe.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    ConfigFormComponent,
    ConfigsComponent,
    ServicesComponent,
    SubscribeComponent,
    SubscribersComponent,
    SubscriptionsComponent,
    ManagerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
