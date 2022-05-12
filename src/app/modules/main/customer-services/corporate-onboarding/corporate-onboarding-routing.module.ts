import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';
import { CorporateOnboardingComponent } from './corporate-onboarding.component';
import { CreateCompanyProfileComponent } from './create-company-profile/create-company-profile.component';
import { SetAccountLimitsComponent } from './set-account-limits/set-account-limits.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateOnboardingComponent,
    children: [
      {
        path: '',
        redirectTo: 'create-company-profile',
        pathMatch: 'full'
      },
      {
        path: 'create-company-profile',
        component: CreateCompanyProfileComponent,
        data: { title: 'Profile Management' }
      },
      {
        path: 'add-roles',
        component: AddRolesComponent,
        data: { title: 'Profile Management' }
      },
      {
        path: 'set-account-limits',
        component: SetAccountLimitsComponent,
        data: { title: 'Profile Management' }
      },
      {
        path: 'add-users',
        component: AddUsersComponent,
        data: { title: 'Profile Management' }
      },
      {
        path: 'add-workflow',
        component: AddWorkflowComponent,
        data: { title: 'Profile Management' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateOnboardingRoutingModule {}
