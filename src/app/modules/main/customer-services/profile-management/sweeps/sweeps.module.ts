import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweepsRoutingModule } from './sweeps-routing.module';
import { SweepsComponent } from './sweeps.component';
import { SweepModule } from './sweep/sweep.module';
import { SetupSweepModule } from './sweep/setup-sweep/setup-sweep.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReinitiateSweepModule } from './reinitiate-sweep/reinitiate-sweep.module';

@NgModule({
  declarations: [
    SweepsComponent
  ],
  imports: [
    CommonModule,
    SweepsRoutingModule,
    SweepModule,
    SetupSweepModule,
    MatStyleModule,
    ReinitiateSweepModule
  ]
})
export class SweepsModule { }
