import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureFileTemplatesModalComponent } from './configure-file-templates-modal/configure-file-templates-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateHolidayModalComponent } from './create-holiday-modal/create-holiday-modal.component';
import { TransactionMonitoringAmountModalComponent } from './transaction-monitoring-amount-modal/transaction-monitoring-amount-modal.component';
import { FormElementsModule } from '../form-elements/form-elements.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { SelectCifModalComponent } from './select-cif-modal/select-cif-modal.component';
import { SelectAccountNumberModalComponent } from './select-account-number-modal/select-account-number-modal.component';
import { SelectTransactionTypeModalComponent } from './select-transaction-type-modal/select-transaction-type-modal.component';



@NgModule({
  declarations: [
    ConfigureFileTemplatesModalComponent,
    CreateHolidayModalComponent,
    TransactionMonitoringAmountModalComponent,
    SelectCifModalComponent,
    SelectAccountNumberModalComponent,
    SelectTransactionTypeModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    FormElementsModule,
    SharedComponentsModule
  ],
  exports:[
    ConfigureFileTemplatesModalComponent,
    CreateHolidayModalComponent,
    TransactionMonitoringAmountModalComponent,
    SelectCifModalComponent,
    SelectAccountNumberModalComponent,
    SelectTransactionTypeModalComponent
  ]
})
export class SharedModalsModule { }
