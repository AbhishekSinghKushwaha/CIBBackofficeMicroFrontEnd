import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { CustomColumnComponent } from './custom-column.component';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [TableComponent, CustomColumnComponent],
  imports: [CommonModule, CdkTableModule, MatStyleModule],
  exports: [TableComponent, CustomColumnComponent]
})
export class DatatableModule {}
