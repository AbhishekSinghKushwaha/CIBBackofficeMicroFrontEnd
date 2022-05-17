import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureFileTemplatesModalComponent } from './configure-file-templates-modal/configure-file-templates-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    ConfigureFileTemplatesModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ]
})
export class SharedModalsModule { }
