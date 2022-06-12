import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowManagementComponent } from './workflow-management.component';
import { WorkflowManagementRoutingModule } from './workflow-management-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CreateWorkflowModule } from './create-workflow/create-workflow.module';

@NgModule({
  declarations: [
    WorkflowManagementComponent
  ],
  imports: [
    CommonModule,
    WorkflowManagementRoutingModule,
    MatStyleModule,
    CreateWorkflowModule
  ]
})
export class WorkflowManagementModule { }
