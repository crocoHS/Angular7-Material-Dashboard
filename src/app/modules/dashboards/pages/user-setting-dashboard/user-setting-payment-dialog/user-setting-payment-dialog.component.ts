import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-setting-payment-dialog',
  templateUrl: './user-setting-payment-dialog.component.html',
  styleUrls: ['./user-setting-payment-dialog.component.scss']
})
export class UserSettingPaymentDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<UserSettingPaymentDialogComponent>,
      @Inject( MAT_DIALOG_DATA ) public data,
  ) { }

  ngOnInit() {
  }

}
