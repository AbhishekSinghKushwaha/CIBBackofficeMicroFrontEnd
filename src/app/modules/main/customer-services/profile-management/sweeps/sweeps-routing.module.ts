import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweepsComponent } from './sweeps.component';

const routes: Routes = [{ path: '', component: SweepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SweepsRoutingModule {}
