import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkflowComponent } from './create-workflow.component';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkflowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateWorkflowRoutingModule { }
