import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { ProfileManagementComponent } from './profile-management.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ProfileManagementTopNavModule } from 'src/app/shared/components/profile-management-top-nav/profile-management-top-nav.module';

@NgModule({
  declarations: [ProfileManagementComponent],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule,
    MatStyleModule,
    ProfileManagementTopNavModule
  ]
})
export class ProfileManagementModule {}
