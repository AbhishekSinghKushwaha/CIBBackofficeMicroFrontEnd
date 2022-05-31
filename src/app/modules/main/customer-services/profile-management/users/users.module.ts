import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileAddUserComponent } from './add-user/add-user.component';
import { ProfileManagementTopNavModule } from 'src/app/shared/components/profile-management-top-nav/profile-management-top-nav.module';
import { AddUserModule } from 'src/app/shared/components/add-user/add-user.module';
import { UserListComponent } from 'src/app/shared/components/user-list/user-list.component';
import { PromptModalModule } from 'src/app/shared/modals/prompt-modal/prompt-modal.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent,
    ProfileAddUserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatStyleModule,
    SharedModalsModule,
    ReactiveFormsModule,
    ProfileManagementTopNavModule,
    AddUserModule,
    PromptModalModule,
    SharedComponentsModule
  ]
})
export class UsersModule { }
