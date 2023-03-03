import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { WalletComponent, WalletDialogComonent } from './components/wallet.component';
import { SettingsComponent, SettingsEditComonent } from './components/settings.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceEditComponent } from './components/services/service-edit.component';
import { SubscribersComponent } from './components/services/subscribers.component';
import { SubscribeComponent } from './components/subscriptions/subscribe.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { TransactionComponent } from './components/transaction.component';
import { MillisecondToTimePipe } from './millisecond-to-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WalletDialogComonent,
    SettingsComponent,
    SettingsEditComonent,
    ServicesComponent,
    ServiceEditComponent,
    SubscribersComponent,
    SubscribeComponent,
    SubscriptionsComponent,
    DashboardComponent,
    TransactionComponent,
    MillisecondToTimePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatDialogModule,
    MatSliderModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
