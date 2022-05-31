import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { CorporateUserRolesModule } from '../corporate-user-roles/corporate-user-roles.module';
import { CorporateUserProductsModule } from '../corporate-user-products/corporate-user-products.module';
import { CorporateUserAccountsModule } from '../corporate-user-accounts/corporate-user-accounts.module';
import { ConfirmDialogModule } from '../../modals/confirm-dialog/confirm-dialog.module';
import { SharedComponentsModule } from '../shared-components.module';



@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormElementsModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateUserRolesModule,
    CorporateUserProductsModule,
    CorporateUserAccountsModule,
    ConfirmDialogModule,
    SharedComponentsModule
  ],
  exports: [AddUserComponent]

})
export class AddUserModule { }
