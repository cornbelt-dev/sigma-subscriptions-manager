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
import { ManagerComponent } from './components/manage/manager.component';
import { ConfigsComponent } from './components/manage/configs.component';
import { ServicesComponent } from './components/manage/services.component';
import { ServiceEditComponent } from './components/manage/service-edit.component';
import { SubscribersComponent } from './components/manage/subscribers.component';
import { SubscribeComponent } from './components/subscriptions/subscribe.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { MillisecondToTimePipe } from './millisecond-to-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WalletDialogComonent,
    SettingsComponent,
    SettingsEditComonent,
    ConfigsComponent,
    ServicesComponent,
    ServiceEditComponent,
    SubscribersComponent,
    SubscribeComponent,
    SubscriptionsComponent,
    ManagerComponent,
    DashboardComponent,
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
