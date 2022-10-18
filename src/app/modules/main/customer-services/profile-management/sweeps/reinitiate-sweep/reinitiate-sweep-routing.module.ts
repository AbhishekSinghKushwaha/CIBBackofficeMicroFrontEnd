import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReinitiateSweepComponent } from './reinitiate-sweep.component';

const routes: Routes = [
  {
    path: '',
    component: ReinitiateSweepComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReinitiateSweepRoutingModule { }
