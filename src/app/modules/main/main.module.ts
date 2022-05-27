import { MatStyleModule } from 'src/app/mat-style.module';
import { SidebarModule } from './../../shared/components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, LayoutModule, SidebarModule, MatStyleModule]
})
export class MainModule { }
