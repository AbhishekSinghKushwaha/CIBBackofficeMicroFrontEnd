import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalLimitsComponent } from './global-limits.component';

const routes: Routes = [{ path: '', component: GlobalLimitsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalLimitsRoutingModule {}
