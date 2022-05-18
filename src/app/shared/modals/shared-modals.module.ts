import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureFileTemplatesModalComponent } from './configure-file-templates-modal/configure-file-templates-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfigureFileTemplatesModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
  ]
})
export class SharedModalsModule { }
