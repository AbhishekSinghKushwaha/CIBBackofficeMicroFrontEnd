import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsNavbarComponent } from './breadcrumbs-navbar/breadcrumbs-navbar.component';
import { LateralNavbarComponent } from './lateral-navbar/lateral-navbar.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [BreadcrumbsNavbarComponent, LateralNavbarComponent],
  imports: [CommonModule, MatStyleModule],
  exports: [BreadcrumbsNavbarComponent, LateralNavbarComponent],
  providers: [Title]
})
export class LayoutModule {}
