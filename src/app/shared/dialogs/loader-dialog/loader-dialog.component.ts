import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ar-loader-dialog',
  templateUrl: './loader-dialog.component.html',
  styleUrls: ['./loader-dialog.component.scss']
})
export class LoaderDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<LoaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
