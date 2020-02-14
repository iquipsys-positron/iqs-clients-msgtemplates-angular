import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'pip-message-review-dialog',
  styleUrls: ['./message-review-dialog.scss'],
  templateUrl: 'message-review-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class MessageReviewDialog {

  review: any;
  constructor(
    public dialogRef: MatDialogRef<MessageReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.review = data.review;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
