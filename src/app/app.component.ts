import { Component, OnInit } from '@angular/core';
// import { ElectronService } from './shared/services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(){}

  ngOnInit() {
    // this.electronService.checkForUpdates();
  }
  title = 'PT DB';

}
