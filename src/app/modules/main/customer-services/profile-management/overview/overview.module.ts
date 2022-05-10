import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, OverviewRoutingModule, MatStyleModule]
})
export class OverviewModule {}
