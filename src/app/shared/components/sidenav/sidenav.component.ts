import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { LINKS } from './links.constants';
import { ElectronService } from '../../services/electron.service';
import { FormControl } from '@angular/forms';
import { BackService } from '../../services/back.service';
import { Subscription } from 'rxjs';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
@Component({
  selector: 'ar-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  links = LINKS;
  tags= new FormControl([]);
  exerciseTags: string[] = [];
  sub = new Subscription();
  constructor(private readonly electronService: ElectronService, private backService: BackService, private readonly ngZone: NgZone) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub.add(this.tags.valueChanges.subscribe((value: any) => {
        this.backService.tagsChanged.next(value);
    }))
    console.log(this.backService.tags);
    ipcRenderer.on('excel-data', (event: any, jsonData: any) => {
      this.ngZone.run(() => {

        this.exerciseTags = jsonData.tags;
      });
    });
  }

  
  exit(){
    this.electronService.exitApp();
  }
}
