import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionApprovalsRoutingModule } from './transaction-approvals-routing.module';
import { TransactionApprovalsComponent } from './transaction-approvals.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransactionApprovalsComponent
  ],
  imports: [
    CommonModule,
    TransactionApprovalsRoutingModule,
    MatStyleModule,
    ReactiveFormsModule
  ]
})
export class TransactionApprovalsModule { }
