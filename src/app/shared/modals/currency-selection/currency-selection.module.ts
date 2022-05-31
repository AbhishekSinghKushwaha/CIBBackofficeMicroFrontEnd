import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectionComponent } from './currency-selection.component';
import { MatStyleModule } from 'src/app/mat-style.module';

import { CurrencyListItemComponent } from '../../components/currency-list-item/currency-list-item.component';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/contansts/currency-selection.constants';

@NgModule({
  declarations: [CurrencySelectionComponent, CurrencyListItemComponent],
  imports: [CommonModule, MatStyleModule],
  exports: [CurrencySelectionComponent, CurrencyListItemComponent],
  providers: [CurrencySelectionService, CurrencySelectionConstants],
})
export class CurrencySelectionModule {}
