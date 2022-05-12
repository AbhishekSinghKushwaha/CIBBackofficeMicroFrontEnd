import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {
  rolesForm: FormGroup;
  panelOpenState = {
    title: true,
    roles: true
  };
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.rolesForm = this.fb.group({
      roleTitle: ['']
    });
  }

  saveAndContinue() {
    this.router.navigate([
      '/customer-services/corporate-onboarding/set-account-limits'
    ]);
  }

  skip() {
    this.router.navigate([
      '/customer-services/corporate-onboarding/set-account-limits'
    ]);
  }
}
