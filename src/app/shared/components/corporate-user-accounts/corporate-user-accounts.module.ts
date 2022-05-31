import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateUserAccountsComponent } from './corporate-user-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    CorporateUserAccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
  ],
  exports: [
    CorporateUserAccountsComponent
  ],

})
export class CorporateUserAccountsModule { }
