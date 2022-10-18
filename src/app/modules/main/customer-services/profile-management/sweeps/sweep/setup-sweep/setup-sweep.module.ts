import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupSweepRoutingModule } from './setup-sweep-routing.module';
import { SetupSweepComponent } from './setup-sweep.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/shared/form-elements/form-elements.module';
import { BiometricVerificationModule } from 'src/app/shared/modals/biometric-verification/biometric-verification.module';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';

@NgModule({
  declarations: [
    SetupSweepComponent
  ],
  imports: [
    CommonModule,
    SetupSweepRoutingModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
    BiometricVerificationModule,
    SharedModalsModule
  ]
})
export class SetupSweepModule { }
