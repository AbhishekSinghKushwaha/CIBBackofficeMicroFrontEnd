import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        // redirectTo: '/customer-services',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: (): Promise<any> =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'My Dashboard' }
      },
      {
        path: 'customer-services',
        loadChildren: (): Promise<any> =>
          import('./customer-services/customer-services.module').then(
            m => m.CustomerServicesModule
          ),
        data: { title: 'Customer Services' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
