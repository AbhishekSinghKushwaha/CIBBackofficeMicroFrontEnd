import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionApprovalSearchPipe } from './transaction-approval-search/transaction-approval-search.pipe';
import { CountrySearchPipe } from './country-search/country-search.pipe';



@NgModule({
  declarations: [
    TransactionApprovalSearchPipe,
    CountrySearchPipe
  ],
  imports: [CommonModule],
  exports: [
    TransactionApprovalSearchPipe,
    CountrySearchPipe
  ]
})
export class PipesModule { }
