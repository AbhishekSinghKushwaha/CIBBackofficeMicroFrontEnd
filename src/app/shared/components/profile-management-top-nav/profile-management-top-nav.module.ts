import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManagementTopNavComponent } from './profile-management-top-nav.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [ProfileManagementTopNavComponent],
  imports: [CommonModule, MatStyleModule],
  exports: [ProfileManagementTopNavComponent]
})
export class ProfileManagementTopNavModule {}
