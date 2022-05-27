import { CifService } from './../../../core/services/cif/cif.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorporateSearchService } from 'src/app/core/services/customer-services/corporate-search.service';

export interface CustomerSearchResult {
  name: string;
  idNumber: number;
  profileType: string;
  status: string;
  lastViewed: string;
}
@Component({
  selector: 'app-corporate-search-modal',
  templateUrl: './corporate-search-modal.component.html',
  styleUrls: ['./corporate-search-modal.component.scss']
})
export class CorporateSearchModalComponent implements OnInit {
  searchForm!: FormGroup;
  showSearchTable: boolean = false;
  eddFlow: boolean = false;
  noResult: boolean = false;
  searchFilters: string[] = [
    'Account number',
    'ID number',
    'Mobile number',
    'CIF',
    "Voter's ID",
    "Driver's License",
    'Passport'
  ];

  customerData: CustomerSearchResult[] = [
  ];
  highRiskCustomer: CustomerSearchResult[] = [
    {
      name: 'George Okonjo',
      idNumber: 234343,
      profileType: 'Individual',
      status: 'Flagged',
      lastViewed: '12/02/2020'
    },
    {
      name: 'George Okonjo',
      idNumber: 234343,
      profileType: 'Individual',
      status: 'Active',
      lastViewed: '12/02/2020'
    }
  ];
  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private corporateSearchService: CorporateSearchService,
    private cifService: CifService
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm();
  }

  initializeSearchForm(): void {
    this.searchForm = this.fb.group({
      option: ['', Validators.required],
      searchText: ['', Validators.required]
    });
  }

  onSearchSubmit(): void {
    this.eddFlow = false;
    this.noResult = false;
    if (this.searchForm.status === 'INVALID') {
      return;
    }
    if (this.searchForm.controls.searchText.value === '12345') {
      this.customerData = [];
      this.noResult = true;
    }
    if (this.searchForm.controls.searchText.value === '123456') {
      this.customerData = this.highRiskCustomer;
      this.eddFlow = true;
    }

    setTimeout(() => {
      this.showSearchTable = true;
    }, 2000);
    console.log(this.searchForm.controls)
    this.cifService.getCorporateByCif(this.searchForm.controls.searchText.value).subscribe((res: any) => {
      if (res.isSuccessful) {
        this.customerData = [res.data].map((corporate: any) => {
          return {
            name: corporate.corporateName,
            idNumber: corporate.cif,
            profileType: 'Corporate',
            status: 'Active',
            lastViewed: '12/02/2020'
          }
        })
        this.cifService.setCorporate(res.data);
      }
    })
  }

  clearSearchText(): void {
    this.searchForm.controls.searchText.setValue('');
  }

  closeSearch() {
    this.corporateSearchService.corporateSearchModalRef.close();
  }

  goToOverview() {
    this.corporateSearchService.corporateSearchModalRef.close();
    this.router.navigate(['/customer-services/corporate-360']);
  }
}
