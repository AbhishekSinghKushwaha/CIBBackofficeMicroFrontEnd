import { Component, OnInit } from '@angular/core';
import { CorporateSearchService } from 'src/app/core/services/customer-services/corporate-search.service';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.scss']
})
export class CustomerServicesComponent implements OnInit {
  constructor(
    private readonly corporateSearchService: CorporateSearchService
  ) {}

  ngOnInit(): void {}

  openCorporateSearchModal() {
    this.corporateSearchService.openCorporateSearchModal();
  }
}
