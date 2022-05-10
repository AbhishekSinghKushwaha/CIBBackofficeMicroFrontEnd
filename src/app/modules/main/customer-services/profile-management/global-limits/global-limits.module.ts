import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalLimitsRoutingModule } from './global-limits-routing.module';
import { GlobalLimitsComponent } from './global-limits.component';


@NgModule({
  declarations: [
    GlobalLimitsComponent
  ],
  imports: [
    CommonModule,
    GlobalLimitsRoutingModule
  ]
})
export class GlobalLimitsModule { }
