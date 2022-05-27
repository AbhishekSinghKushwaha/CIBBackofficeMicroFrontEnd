import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ConfigrureTransactionRoutingModule } from './configure-transaction-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureTransactionComponent } from './configure-transaction.component';
import { BiometricVerificationModule } from 'src/app/shared/modals/biometric-verification/biometric-verification.module';
import { CdkColumnDef } from '@angular/cdk/table';



@NgModule({
  declarations: [
    ConfigureTransactionComponent
  ],
  imports: [
    CommonModule,
    ConfigrureTransactionRoutingModule,
    MatStyleModule,
    BiometricVerificationModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [CdkColumnDef]
})
export class ConfigureTransactionModule { }
