import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { CorporateUserProductsComponent } from './corporate-user-products.component';

@NgModule({
  declarations: [
    CorporateUserProductsComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,

  ],
  exports: [CorporateUserProductsComponent]
})
export class CorporateUserProductsModule { }
