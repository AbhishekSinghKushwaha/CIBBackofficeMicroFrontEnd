import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { FileTemplateComponent } from './file-template/file-template.component';
import { ListFileTemplatesComponent } from './file-template/list-file-templates/list-file-templates.component';
import { NewFileTemplatesComponent } from './file-template/new-file-templates/new-file-templates.component';
import { HolidayConfigurationComponent } from './holiday-configuration/holiday-configuration.component';
import { ListHolidaysComponent } from './holiday-configuration/list-holidays/list-holidays.component';
import { TransactionMonitoringComponent } from './transaction-monitoring/transaction-monitoring.component';
import { TransactionMonitoringListComponent } from './transaction-monitoring/transaction-monitoring-list/transaction-monitoring-list.component';
import { ListTransactionConfigurationComponent } from './transaction-configuration/list-transaction-configuration/list-transaction-configuration.component';
import { TransactionConfigurationComponent } from './transaction-configuration/transaction-configuration.component';
import { AddTransactionMonitoringComponent } from './transaction-monitoring/add-transaction-monitoring/add-transaction-monitoring.component';

const routes: Routes = [
  {
    path: '', component: ConfigurationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'file-template-configuration',
        pathMatch: 'full'
      },
      {
        path: 'holiday-configuration',
        component: HolidayConfigurationComponent,
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: ListHolidaysComponent },
        ]
      },
      {
        path: 'file-template-configuration',
        component: FileTemplateComponent,
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: ListFileTemplatesComponent },
          { path: 'new', component: NewFileTemplatesComponent },
        ]
      },
      {
        path: 'transaction-configuration',
        component: TransactionConfigurationComponent,
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: ListTransactionConfigurationComponent }
        ]
      },
      {
        path: 'transaction-monitoring',
        component: TransactionMonitoringComponent,
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: TransactionMonitoringListComponent },
          { path: 'new', component: AddTransactionMonitoringComponent },
        ]
      },
      {
        path: 'workflow-management',
        loadChildren: () => import('./workflow-management/workflow-management.module').then(m => m.WorkflowManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
