import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweepsRoutingModule } from './sweeps-routing.module';
import { SweepsComponent } from './sweeps.component';


@NgModule({
  declarations: [
    SweepsComponent
  ],
  imports: [
    CommonModule,
    SweepsRoutingModule
  ]
})
export class SweepsModule { }
