import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequentialApprovalComponent } from './sequential-approval.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SequentialApprovalService } from 'src/app/core/services/sequential-approval/sequential-approval.service';
import { SequentialApprovalDataModule } from './sequential-approval-data/sequential-approval-data.module'


@NgModule({
  declarations: [
    SequentialApprovalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SequentialApprovalDataModule
  ],
  providers: [
    SequentialApprovalService
  ]
})
export class SequentialApprovalModule { }
