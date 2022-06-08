import { ConfigureTransactionComponent } from './configure-transaction.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  {
    path: '',
    component: ConfigureTransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigrureTransactionRoutingModule { }
