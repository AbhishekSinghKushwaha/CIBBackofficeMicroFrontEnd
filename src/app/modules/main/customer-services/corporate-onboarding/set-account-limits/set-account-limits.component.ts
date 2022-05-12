import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-account-limits',
  templateUrl: './set-account-limits.component.html',
  styleUrls: ['./set-account-limits.component.scss']
})
export class SetAccountLimitsComponent implements OnInit {
  accountLimitsForm: FormGroup;

  panelOpenState = {
    loot: true,
    classic: true,
    mobile: true
  };
  constructor(private router: Router, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.accountLimitsForm = this.fb.group({
      currency: [''],
      maximumPerTransaction: [''],
      dailyLimit: [''],
      weeklyLimit: [''],
      monthlyLimit: ['']
    });
  }

  saveAndContinue() {
    this.router.navigate(['/customer-services/corporate-onboarding/add-users']);
  }

  skip() {
    this.router.navigate(['/customer-services/corporate-onboarding/add-users']);
  }
}
