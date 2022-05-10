import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateSearchModalComponent } from './corporate-search-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultTableComponent } from './search-result-table/search-result-table.component';
import { CorporateSearchService } from 'src/app/core/services/customer-services/corporate-search.service';

@NgModule({
  declarations: [CorporateSearchModalComponent, SearchResultTableComponent],
  imports: [CommonModule, MatStyleModule, FormsModule, ReactiveFormsModule],
  exports: [CorporateSearchModalComponent, SearchResultTableComponent],
  providers: [CorporateSearchService]
})
export class CorporateSearchModalModule {}
