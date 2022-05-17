import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionApprovalDetailsRoutingModule } from './transaction-approval-details-routing.module';
import { TransactionApprovalDetailsComponent } from './transaction-approval-details.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BiometricVerificationModule } from 'src/app/shared/modals/biometric-verification/biometric-verification.module';

@NgModule({
  declarations: [
    TransactionApprovalDetailsComponent
  ],
  imports: [
    CommonModule,
    TransactionApprovalDetailsRoutingModule,
    MatStyleModule,
    BiometricVerificationModule
  ]
})
export class TransactionApprovalDetailsModule { }
