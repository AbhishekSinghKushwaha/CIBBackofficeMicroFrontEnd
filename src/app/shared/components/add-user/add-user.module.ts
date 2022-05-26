import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';



@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormElementsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddUserComponent]

})
export class AddUserModule { }
