import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequentialApprovalDataComponent, CustomPaginator } from './sequential-approval-data.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SequentialApprovalDataComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class SequentialApprovalDataModule { }
