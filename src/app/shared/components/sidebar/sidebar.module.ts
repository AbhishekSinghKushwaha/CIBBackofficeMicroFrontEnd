import { RouterModule } from '@angular/router';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule, MatStyleModule, RouterModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
