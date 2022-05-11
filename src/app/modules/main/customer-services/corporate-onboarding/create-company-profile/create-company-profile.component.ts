import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.scss']
})
export class CreateCompanyProfileComponent implements OnInit {
  customerProfileForm: FormGroup;
  panelOpenState = {
    customerIdenfitifier: true,
    transactionLimits: true,
    products: true,
    tariff: true
  };

  products: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.products = this.storageService.getData('products-and-services');
  }

  initForm(): void {
    this.customerProfileForm = this.fb.group({
      // Customer Identifier
      globalCIF: ['', [Validators.required]],
      corporateCIF: ['', [Validators.required]],
      corporateSegment: ['', [Validators.required]],
      // Transaction Limits
      currency: ['', Validators.required],
      maximumPerTransaction: ['', Validators.required],
      dailyLimit: ['', Validators.required],
      weeklyLimit: ['', Validators.required],
      // Tariff
      tariff: ['']
    });
  }

  saveAndContinue() {
    this.router.navigate(['/customer-services/corporate-onboarding/add-roles']);
  }
}
