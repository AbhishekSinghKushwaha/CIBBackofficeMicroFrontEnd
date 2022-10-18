import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweepComponent } from './sweep.component';

const routes: Routes = [
  {
    path: '',
    component: SweepComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SweepRoutingModule { }
