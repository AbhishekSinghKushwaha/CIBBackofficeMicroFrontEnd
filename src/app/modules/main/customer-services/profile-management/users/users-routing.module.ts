import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users.component';
import { ProfileAddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from 'src/app/shared/components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'initiators/list'
      },
      {
        path: ':category/list',
        component: UserListComponent,
      },
      {
        path: ':category/add',
        component: ProfileAddUserComponent,
      },
    ],
  }
];
// NewUserComponent
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
