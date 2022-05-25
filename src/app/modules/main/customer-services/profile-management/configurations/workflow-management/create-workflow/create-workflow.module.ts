import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateWorkflowRoutingModule } from './create-workflow-routing.module';
import { CreateWorkflowComponent } from './create-workflow.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ProfileManagementTopNavModule } from 'src/app/shared/components/profile-management-top-nav/profile-management-top-nav.module';
import { FormElementsModule } from 'src/app/shared/form-elements/form-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SequentialApprovalModule } from 'src/app/shared/modals/sequential-approval/sequential-approval.module';

@NgModule({
  declarations: [
    CreateWorkflowComponent
  ],
  imports: [
    CommonModule,
    CreateWorkflowRoutingModule,
    MatStyleModule,
    ProfileManagementTopNavModule,
    FormElementsModule,
    FormsModule,
    ReactiveFormsModule,
    SequentialApprovalModule
  ]
})
export class CreateWorkflowModule { }
