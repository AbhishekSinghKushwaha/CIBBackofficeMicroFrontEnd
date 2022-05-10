import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerServicesRoutingModule } from './customer-services-routing.module';
import { CustomerServicesComponent } from './customer-services.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CorporateSearchModalModule } from 'src/app/shared/modals/corporate-search-modal/corporate-search-modal.module';

@NgModule({
  declarations: [CustomerServicesComponent],
  imports: [
    CommonModule,
    CustomerServicesRoutingModule,
    MatStyleModule,
    CorporateSearchModalModule
  ]
})
export class CustomerServicesModule {}
