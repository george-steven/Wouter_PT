import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { LoaderDialogComponent } from './dialogs/loader-dialog/loader-dialog.component';


@NgModule({
  declarations: [
    SidenavComponent,
    LoaderDialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    SidenavComponent,


  ]
})
export class SharedModule { }
