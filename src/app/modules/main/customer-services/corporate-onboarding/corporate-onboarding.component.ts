import { Component, OnInit } from '@angular/core';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-corporate-onboarding',
  templateUrl: './corporate-onboarding.component.html',
  styleUrls: ['./corporate-onboarding.component.scss']
})
export class CorporateOnboardingComponent implements OnInit {
  constructor(
    private readonly dataLookup: DataLookupService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getProductsAndServices();
    this.getRoles();
    this.getUserAccounts();
  }

  // Get roles
  getRoles() {
    this.dataLookup.getRoles().subscribe(res => {
      if (res.isSuccessful) {
        this.storageService.setData('onboarding-roles', res.data);
      }
    });
  }

  // Get Countries
  getCountries() {
    this.dataLookup.getCountries().subscribe(res => {
      if (res.status) {
        this.storageService.setData('countries', res.data);
      }
    });
  }

  getProductsAndServices() {
    this.dataLookup.getProductsAndServices().subscribe(res => {
      if (res.isSuccessful) {
        this.storageService.setData('products-and-services', res.data);
      }
    });
  }

  getUserAccounts() {
    this.dataLookup.getUserAccounts().subscribe(res => {
      console.log(res);
      if (res.status) {
        this.storageService.setData('user-accounts', res.data);
      }
    });
  }
}
