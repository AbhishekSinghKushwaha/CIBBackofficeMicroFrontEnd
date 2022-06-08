import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptModalComponent } from './prompt-modal.component';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PromptModalComponent],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [PromptModalComponent],

})
export class PromptModalModule { }
