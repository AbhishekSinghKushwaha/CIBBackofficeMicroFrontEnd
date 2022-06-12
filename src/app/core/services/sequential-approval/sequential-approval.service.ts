import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SequentialApprovalComponent } from 'src/app/shared/modals/sequential-approval/sequential-approval.component';
import { Subject } from 'rxjs';
import { SequentialApprovalDataComponent } from 'src/app/shared/modals/sequential-approval/sequential-approval-data/sequential-approval-data.component';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SequentialApprovalService {

  dialogRef: any;

  seqDialogRef: any;

  private dataSource = new BehaviorSubject([]);
  public currentData = this.dataSource.asObservable();

  constructor(private readonly dialog: MatDialog) { }

  orderSequence(payload: any): void {
    this.dataSource.next(payload);
  }

  open() {
    this.dialogRef =  this.dialog.open<SequentialApprovalComponent>(SequentialApprovalComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  } 

  close() {
    this.dialogRef.close()
  }

  openSequentialData() {
    this.seqDialogRef =  this.dialog.open<SequentialApprovalDataComponent>(SequentialApprovalDataComponent, {
      disableClose: true,
    });
    return this.seqDialogRef;
  } 

  closeSequentialData() {
    this.seqDialogRef.close()
  }
  
}
