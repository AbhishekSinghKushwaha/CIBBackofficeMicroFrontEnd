import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupSweepComponent } from './setup-sweep.component';

const routes: Routes = [
  {
    path: '',
    component: SetupSweepComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupSweepRoutingModule { }
