import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsNavbarComponent } from './breadcrumbs-navbar/breadcrumbs-navbar.component';
import { LateralNavbarComponent } from './lateral-navbar/lateral-navbar.component';

@NgModule({
  declarations: [BreadcrumbsNavbarComponent, LateralNavbarComponent],
  imports: [CommonModule],
  exports: [BreadcrumbsNavbarComponent, LateralNavbarComponent]
})
export class LayoutModule {}
