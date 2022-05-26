import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users.component';
import { ProfileAddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'new-user',pathMatch:'full' },
      {
        path: 'new-user',
        component: NewUserComponent
      },
      {
        path: 'add-user',
        component: ProfileAddUserComponent
      },
    ],
   
  },
  {
    path: 'nadd-user',
    component: ProfileAddUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
