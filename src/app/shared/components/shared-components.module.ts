import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AccountDropdownItemComponent } from './account-dropdown-item/account-dropdown-item.component';
import { ConfirmationCompletionComponent } from './confirmation-completion/confirmation-completion.component';

const components = [
  AccountDropdownItemComponent,
  ConfirmationCompletionComponent,
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MatStyleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: components
})
export class SharedComponentsModule { }
