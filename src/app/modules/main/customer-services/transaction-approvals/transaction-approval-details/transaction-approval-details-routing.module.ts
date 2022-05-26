import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionApprovalDetailsComponent } from './transaction-approval-details.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionApprovalDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionApprovalDetailsRoutingModule { }
