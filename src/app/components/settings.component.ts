import { Component, Inject, Optional, Renderer2 } from '@angular/core';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Network } from '@fleet-sdk/common';
import { ManagerService } from 'src/app/services/manager.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent {

  constructor(public dialog: MatDialog, private managerService: ManagerService, private renderer: Renderer2) { }

  ngOnInit() {
    const mode = localStorage.getItem("modeClass");
    if (mode)
      this.renderer.addClass(document.body, mode);
  }

  openSettings() {
    this.dialog.open(SettingsEditComonent);
  }

  toggleMode() {
    const newMode = document.body.classList.contains("light") ? "" : "light";
    localStorage.setItem("modeClass", newMode);
    newMode == "" ? 
      this.renderer.removeClass(document.body, "light") :
      this.renderer.addClass(document.body, newMode); 

    var theme = document.getElementById('theme');
    if (theme) {
      newMode == "" ? theme.setAttribute('href','./assets/theme-bootstrap.css') : theme.setAttribute('href','./assets/theme-light-bootstrap.css');
    }
  }

}

@Component({
  selector: 'settings-edit',
  templateUrl: './settings-edit.component.html',
})
export class SettingsEditComonent {

  networks = [{ key: "Mainnet", value: Network.Mainnet }, {key: "Testnet", value: Network.Testnet }];
  model: Settings = { network: environment.envVar.Network, apiUrl: environment.envVar.API_URL, explorerUrl: environment.envVar.ExplorerUrl };

  constructor(public dialogRef: MatDialogRef<SettingsEditComonent>, private managerService: ManagerService) {
    this.model.network = managerService.sigmaSubscriptions.NetworkType;
    this.model.apiUrl = managerService.sigmaSubscriptions.API_URL;
    this.model.explorerUrl = managerService.explorerUrl;
  }

  save() {
    this.managerService.setNetwork(this.model.network);
    this.managerService.setAPIUrl(this.model.apiUrl);
    this.managerService.setExplorerUrl(this.model.explorerUrl);
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
  explorerUrl: string;
}