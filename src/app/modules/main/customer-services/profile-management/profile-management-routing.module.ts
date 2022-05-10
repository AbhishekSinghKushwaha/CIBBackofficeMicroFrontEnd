import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileManagementComponent } from './profile-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementComponent,
    // data: { title: 'Profile Management' },
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadChildren: (): Promise<any> =>
          import('./overview/overview.module').then(m => m.OverviewModule),
        data: { title: 'Profile Management' }
      },
      {
        path: 'configurations',
        loadChildren: (): Promise<any> =>
          import('./configurations/configurations.module').then(
            m => m.ConfigurationsModule
          ),
        data: { title: 'Profile Management' }
      },
      {
        path: 'users',
        loadChildren: (): Promise<any> =>
          import('./users/users.module').then(m => m.UsersModule),
        data: { title: 'Profile Management' }
      },

      {
        path: 'products',
        loadChildren: (): Promise<any> =>
          import('./products/products.module').then(m => m.ProductsModule),
        data: { title: 'Profile Management' }
      },
      {
        path: 'global-limits',
        loadChildren: (): Promise<any> =>
          import('./global-limits/global-limits.module').then(
            m => m.GlobalLimitsModule
          ),
        data: { title: 'Profile Management' }
      },
      {
        path: 'sweeps',
        loadChildren: (): Promise<any> =>
          import('./sweeps/sweeps.module').then(m => m.SweepsModule),
        data: { title: 'Profile Management' }
      },
      {
        path: 'insurance',
        loadChildren: (): Promise<any> =>
          import('./insurance/insurance.module').then(m => m.InsuranceModule),
        data: { title: 'Profile Management' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementRoutingModule {}
