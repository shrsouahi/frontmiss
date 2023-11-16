import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteclient-dialog',
  templateUrl: './deleteclient-dialog.component.html',
  styleUrls: ['./deleteclient-dialog.component.css'],
})
export class DeleteclientDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteclientDialogComponent>) {}

  ngOnInit(): void {}
}
