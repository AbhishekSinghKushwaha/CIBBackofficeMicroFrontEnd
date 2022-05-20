import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureFileTemplatesModalComponent } from './configure-file-templates-modal/configure-file-templates-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateHolidayModalComponent } from './create-holiday-modal/create-holiday-modal.component';



@NgModule({
  declarations: [
    ConfigureFileTemplatesModalComponent,
    CreateHolidayModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
  ]
})
export class SharedModalsModule { }
