import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweepRoutingModule } from './sweep-routing.module';
import { SweepComponent } from './sweep.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedModalsModule } from 'src/app/shared/modals/shared-modals.module';

@NgModule({
  declarations: [
    SweepComponent
  ],
  imports: [
    CommonModule,
    SweepRoutingModule,
    MatStyleModule,
    SharedModalsModule
  ]
})
export class SweepModule { }
