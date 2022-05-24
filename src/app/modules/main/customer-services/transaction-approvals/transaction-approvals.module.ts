import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionApprovalsRoutingModule } from './transaction-approvals-routing.module';
import { TransactionApprovalsComponent, CustomPaginator } from './transaction-approvals.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
    PipesModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class TransactionApprovalsModule { }
