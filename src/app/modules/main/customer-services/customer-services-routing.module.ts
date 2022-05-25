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
    path: 'create-workflow-management',
    loadChildren: () => import('./profile-management/configurations/workflow-management/create-workflow/create-workflow.module').then(m => m.CreateWorkflowModule)
  },
  {
    path: 'workflow-management/:id/:mode',
    loadChildren: () => import('./profile-management/configurations/workflow-management/create-workflow/create-workflow.module').then(m => m.CreateWorkflowModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServicesRoutingModule {}
