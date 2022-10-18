import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReinitiateSweepRoutingModule } from './reinitiate-sweep-routing.module';
import { ReinitiateSweepComponent } from './reinitiate-sweep.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/shared/form-elements/form-elements.module';
import { BiometricVerificationModule } from 'src/app/shared/modals/biometric-verification/biometric-verification.module';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';

@NgModule({
  declarations: [
    ReinitiateSweepComponent
  ],
  imports: [
    CommonModule,
    ReinitiateSweepRoutingModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
    BiometricVerificationModule,
    SharedModalsModule
  ]
})
export class ReinitiateSweepModule { }
