import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'pip-message-delete-dialog',
  styleUrls: ['./message-delete-dialog.scss'],
  templateUrl: 'message-delete-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class MessageDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<MessageDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
