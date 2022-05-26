import { Component, OnInit } from '@angular/core';
import { CorporateSearchService } from 'src/app/core/services/customer-services/corporate-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.scss']
})
export class CustomerServicesComponent implements OnInit {
  constructor(
    private readonly corporateSearchService: CorporateSearchService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  openCorporateSearchModal() {
    this.corporateSearchService.openCorporateSearchModal();
  }

  openTransactionApprovals() {
    this.router.navigate(['/customer-services/transaction-approvals']);
  }
}
