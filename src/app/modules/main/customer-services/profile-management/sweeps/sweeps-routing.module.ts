import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweepsComponent } from './sweeps.component';

const routes: Routes = [
  { 
    path: '', component: SweepsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./sweep/sweep.module').then(m => m.SweepModule)
      },
      {
        path: 'reinitiate',
        loadChildren: () => import('./reinitiate-sweep/reinitiate-sweep.module').then(m => m.ReinitiateSweepModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SweepsRoutingModule {}
