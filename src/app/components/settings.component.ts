import { Component, Inject, Optional } from '@angular/core';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Network } from '@fleet-sdk/common';
import { FormControl, NgForm } from '@angular/forms';
import { ManagerService } from '../manager.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent {

  constructor(public dialog: MatDialog) { }

  openSettings() {
    this.dialog.open(SettingsEditComonent);
  }

}

@Component({
  selector: 'settings-edit',
  templateUrl: './settings-edit.component.html',
})
export class SettingsEditComonent {

  networks = [{ key: "Mainnet", value: Network.Mainnet }, {key: "Testnet", value: Network.Testnet }];
  model: Settings = { network: environment.envVar.Network, apiUrl: environment.envVar.API_URL };

  constructor(public dialogRef: MatDialogRef<SettingsEditComonent>, private managerService: ManagerService) {
    this.model.network = managerService.sigmaSubscriptions.NetworkType;
    this.model.apiUrl = managerService.sigmaSubscriptions.API_URL;
  }

  save() {
    this.managerService.setNetwork(this.model.network);
    this.managerService.setAPIUrl(this.model.apiUrl);
    this.dialogRef.close();
  }

  reset() {
    this.managerService.reset();
    this.dialogRef.close();
  }

}

export type Settings = {  
  network: Network;
  apiUrl: string;
}