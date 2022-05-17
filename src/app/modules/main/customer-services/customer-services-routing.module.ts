import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerServicesComponent } from './customer-services.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerServicesComponent
  },
  {
    path: 'corporate-360',
    loadChildren: (): Promise<any> =>
      import('./profile-management/profile-management.module').then(
        m => m.ProfileManagementModule
      ),
    data: { title: 'Profile Management' }
  },
  {
    path: 'transaction-approvals',
    loadChildren: (): Promise<any> =>
      import('./transaction-approvals/transaction-approvals.module').then(m => m.TransactionApprovalsModule),  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServicesRoutingModule {}
