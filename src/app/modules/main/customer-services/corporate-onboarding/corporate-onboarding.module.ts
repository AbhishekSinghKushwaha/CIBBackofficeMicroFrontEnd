import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateOnboardingRoutingModule } from './corporate-onboarding-routing.module';
import { CorporateOnboardingComponent } from './corporate-onboarding.component';
import { ProfileManagementTopNavModule } from 'src/app/shared/components/profile-management-top-nav/profile-management-top-nav.module';
import { CreateCompanyProfileComponent } from './create-company-profile/create-company-profile.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { SetAccountLimitsComponent } from './set-account-limits/set-account-limits.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/shared/form-elements/form-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CorporateOnboardingComponent,
    CreateCompanyProfileComponent,
    AddRolesComponent,
    SetAccountLimitsComponent,
    AddUsersComponent,
    AddWorkflowComponent
  ],
  imports: [
    CommonModule,
    CorporateOnboardingRoutingModule,
    MatStyleModule,
    ProfileManagementTopNavModule,
    FormElementsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateOnboardingModule {}
