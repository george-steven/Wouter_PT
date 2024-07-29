import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../shared/services/electron.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderDialogComponent } from '../shared/dialogs/loader-dialog/loader-dialog.component';import { Observable, Subscription } from 'rxjs';
import { BackService } from '../shared/services/back.service';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  data: {
    name: string,
    tags: string,
    link: string
  }[] = [];
  filteredData: {
    name: string,
    tags: string,
    link: string
  }[] = [];
  sub = new Subscription();
  constructor(private readonly electronService: ElectronService, public dialog: MatDialog, private readonly backService: BackService,  private ngZone: NgZone) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit() {
    ipcRenderer.on('excel-data', (event: any, jsonData: any) => {
      this.ngZone.run(() => {

        this.data = jsonData.exercises;
        this.filteredData = JSON.parse(JSON.stringify(this.data));
      });
    });
    
    this.sub.add(this.backService.tagsChanged.subscribe((value) => {
      this.filteredData = this.data.filter((row) => {
        return !value || value.length == 0 || value.every(t => row.tags.includes(t));
      })
    }));

  }


  getQuery() {

    this.executeQuery().then((result) => {
      alert('Query executed!');
    });
  }

  private async executeQuery() {

    // const result = await this.electronService.getQuery(new Date(parameters['from']+':00'), new Date(parameters['until']+':00'), parameters['resource']);
    return [];    
  }


}
