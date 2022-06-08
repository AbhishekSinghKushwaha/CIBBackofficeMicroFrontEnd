import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionApprovalsComponent } from './transaction-approvals.component';
const routes: Routes = [
  {
    path: '',
    component: TransactionApprovalsComponent,
  },
  {
    path: 'details/:id',
    loadChildren: (): Promise<any> => 
      import('./transaction-approval-details/transaction-approval-details.module').then(m => m.TransactionApprovalDetailsModule),
  },
  {
    path: 'success',
    loadChildren: (): Promise<any> =>
      import('../confirmation/confirmation.module').then(m => m.ConfirmationModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionApprovalsRoutingModule { }
