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
    path: 'corporate-onboarding',
    loadChildren: (): Promise<any> =>
      import('./corporate-onboarding/corporate-onboarding.module').then(
        m => m.CorporateOnboardingModule
      ),
    data: { title: 'Profile Management' }
  },
  {
    path: 'transaction-approvals',
    loadChildren: (): Promise<any> =>
      import('./transaction-approvals/transaction-approvals.module').then(m => m.TransactionApprovalsModule),
  },
  {
    path: 'configure-transaction',
    loadChildren: (): Promise<any> =>
      import('./configure-transaction/configure-transaction.module').then(m => m.ConfigureTransactionModule),
  },
  {
    path: 'create-workflow-management',
    loadChildren: () => import('./profile-management/configurations/workflow-management/create-workflow/create-workflow.module').then(m => m.CreateWorkflowModule)
  },
  {
    path: 'workflow-management/:mode',
    loadChildren: () => import('./profile-management/configurations/workflow-management/create-workflow/create-workflow.module').then(m => m.CreateWorkflowModule)
  },
  {
    path: 'success',
    loadChildren: (): Promise<any> =>
      import('./confirmation/confirmation.module').then(m => m.ConfirmationModule),
  },
  {
    path: 'setup-sweep',
    loadChildren: () => import('./profile-management/sweeps/sweep/setup-sweep/setup-sweep.module').then(m => m.SetupSweepModule)
  },
  {
    path: 'reinitiate-sweep',
    loadChildren: () => import('./profile-management/sweeps/reinitiate-sweep/reinitiate-sweep.module').then(m => m.ReinitiateSweepModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServicesRoutingModule { }
