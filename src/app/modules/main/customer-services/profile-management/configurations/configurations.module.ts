import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { HolidayConfigurationComponent } from './holiday-configuration/holiday-configuration.component';
import { FileTemplateComponent } from './file-template/file-template.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ListFileTemplatesComponent } from './file-template/list-file-templates/list-file-templates.component';
import { NewFileTemplatesComponent } from './file-template/new-file-templates/new-file-templates.component';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListHolidaysComponent } from './holiday-configuration/list-holidays/list-holidays.component';
import { ConfirmDialogModule } from 'src/app/shared/modals/confirm-dialog/confirm-dialog.module';
import { TransactionConfigurationComponent } from './transaction-configuration/transaction-configuration.component';
import { ListTransactionConfigurationComponent } from './transaction-configuration/list-transaction-configuration/list-transaction-configuration.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { TransactionMonitoringComponent } from './transaction-monitoring/transaction-monitoring.component';
import { TransactionMonitoringListComponent } from './transaction-monitoring/transaction-monitoring-list/transaction-monitoring-list.component';
import { AddTransactionMonitoringComponent } from './transaction-monitoring/add-transaction-monitoring/add-transaction-monitoring.component';
import { CurrencySelectionModule } from 'src/app/shared/modals/currency-selection/currency-selection.module';
import { CountryModalModule } from 'src/app/shared/modals/country-modal/country-modal.module';
import { WorkflowManagementModule } from './workflow-management/workflow-management.module';
import { CreateWorkflowModule } from './workflow-management/create-workflow/create-workflow.module';


@NgModule({
  declarations: [
    ConfigurationsComponent,
    HolidayConfigurationComponent,
    FileTemplateComponent,
    ListFileTemplatesComponent,
    NewFileTemplatesComponent,
    ListHolidaysComponent,
    TransactionConfigurationComponent,
    ListTransactionConfigurationComponent,
    TransactionMonitoringComponent,
    TransactionMonitoringListComponent,
    AddTransactionMonitoringComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    MatStyleModule,
    SharedModalsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    SharedComponentsModule,
    CurrencySelectionModule,
    CountryModalModule,
    WorkflowManagementModule,
    CreateWorkflowModule
  ],
})
export class ConfigurationsModule { }
