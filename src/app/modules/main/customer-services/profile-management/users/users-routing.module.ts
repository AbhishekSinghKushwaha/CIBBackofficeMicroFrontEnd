import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'new-user',pathMatch:'full' },
      {
        path: 'new-user',
        component: NewUserComponent
      },
      // {
      //   path: 'file-template-configuration',
      //   component: FileTemplateComponent,
      //   children: [
      //     { path: '', redirectTo: 'list' },
      //     { path: 'list', component: ListFileTemplatesComponent },
      //     { path: 'new', component: NewFileTemplatesComponent },
      //   ]
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
