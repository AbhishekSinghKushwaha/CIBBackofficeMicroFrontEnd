import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SequentialApprovalComponent } from 'src/app/shared/modals/sequential-approval/sequential-approval.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SequentialApprovalService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open() {
    this.dialogRef =  this.dialog.open<SequentialApprovalComponent>(SequentialApprovalComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  } 

  close() {
    this.dialogRef.close()
  }
}
