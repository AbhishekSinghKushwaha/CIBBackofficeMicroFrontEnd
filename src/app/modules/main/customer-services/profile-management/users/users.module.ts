import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatStyleModule,
    SharedModalsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
