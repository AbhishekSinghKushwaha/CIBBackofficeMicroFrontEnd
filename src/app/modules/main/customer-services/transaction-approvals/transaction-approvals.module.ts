import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionApprovalsRoutingModule } from './transaction-approvals-routing.module';
import { TransactionApprovalsComponent, CustomPaginator } from './transaction-approvals.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ProfileManagementTopNavModule } from 'src/app/shared/components/profile-management-top-nav/profile-management-top-nav.module';
import { TransactionApprovalService } from 'src/app/core/services/transaction-approval/transaction-approval.service';

@NgModule({
  declarations: [
    TransactionApprovalsComponent
  ],
  imports: [
    CommonModule,
    TransactionApprovalsRoutingModule,
    MatStyleModule,
    FormsModule, 
    ReactiveFormsModule,
    PipesModule,
    ProfileManagementTopNavModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    TransactionApprovalService
  ]
})
export class TransactionApprovalsModule { }
