import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionApprovalSearchPipe } from './transaction-approval-search/transaction-approval-search.pipe';



@NgModule({
  declarations: [
    TransactionApprovalSearchPipe
  ],
  imports: [CommonModule],
  exports: [
    TransactionApprovalSearchPipe
  ]
})
export class PipesModule { }
