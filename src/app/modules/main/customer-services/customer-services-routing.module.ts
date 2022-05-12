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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServicesRoutingModule {}
