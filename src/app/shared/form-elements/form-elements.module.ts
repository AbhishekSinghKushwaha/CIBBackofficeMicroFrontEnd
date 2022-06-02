import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { TransferFromModalModule } from '../modals/transfer-from-modal/transfer-from-modal.module';
import { CurrencySelectionModule } from '../modals/currency-selection/currency-selection.module';
import { TransferFromComponent } from './transfer-from/transfer-from.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';

const declarationImports = [
  InputComponent,
  TransferAmountComponent,
  FieldErrorsComponent,
  TransferFromComponent,
  TransferAmountComponent,
  CurrencyInputComponent
];

@NgModule({
  declarations: [...declarationImports],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    TransferFromModalModule,
    CurrencySelectionModule],
  exports: [
    ...declarationImports,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormElementsModule { }
