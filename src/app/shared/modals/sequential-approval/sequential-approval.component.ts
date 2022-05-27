import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SequentialApprovalService } from 'src/app/core/services/sequential-approval/sequential-approval.service';

@Component({
  selector: 'app-sequential-approval',
  templateUrl: './sequential-approval.component.html',
  styleUrls: ['./sequential-approval.component.scss']
})
export class SequentialApprovalComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<SequentialApprovalComponent>,
    private readonly sequentialApprovalService: SequentialApprovalService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }

  sequenceManually(){
    this.sequentialApprovalService.openSequentialData();
  }

}
