import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SweepsService } from 'src/app/core/services/sweeps/sweeps.service';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';

@Component({
  selector: 'app-reinitiate-sweep',
  templateUrl: './reinitiate-sweep.component.html',
  styleUrls: ['./reinitiate-sweep.component.scss']
})
export class ReinitiateSweepComponent implements OnInit {

  setupSweepForm: FormGroup;
  setupSweepDetailsForm: FormGroup;

  accounts: any = [];
  mode: boolean = false;
  chargeEvents: any = [];

  panelOpenState = {
    additionalInfo: false,
    mandate: true,
    signatories: false
  };

  executionMode: any = [
    {
      id: 1,
      name: "End of day"
    },
    {
      id: 2,
      name: "Beginning of day"
    },
    {
      id: 3,
      name: "Time of day"
    },
    {
      id: 4,
      name: "Min. account balance"
    },
    {
      id: 5,
      name: "Max. account balance"  
    }
  ]

  holidays: any = [
    {
      id: 1,
      name: 'Skip'
    },
    {
      id: 2,
      name: 'Execute day before'
    },
    {
      id: 3,
      name: 'Execute next working day'
    }
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly sweepsService : SweepsService,
    private readonly biometricVerificationService: BiometricVerificationService,
  ) { }

  get getForm() {
    return this.setupSweepForm.controls;
  }

  get getSweepDetailsForm() { 
    return this.setupSweepDetailsForm.controls;
  }

  ngOnInit(): void {
    this.intiForm();
    this.setAccounts();
    this.sweepDetailsForm();
    this.getChargeEvents();
  }

  intiForm(): void {
    this.setupSweepForm = this.fb.group({
      customerName: ['', Validators.required],
      customerCif: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required],
    });
  }

  sweepDetailsForm(): void {
    this.setupSweepDetailsForm = this.fb.group({
      sweepName: ['', Validators.required],
      startDate: ['', Validators.required],
      executionMode: ['', Validators.required],
      executionModeDetails: [{value: '', disabled: true}],
      executionDetails: [''],
      frequency: ['', Validators.required],
      holidays: ['', Validators.required]
    });
  }

  getChargeEvents() {
    this.sweepsService.getChargeEvents().subscribe((res: any) => {
      this.chargeEvents = res.data
    });
  }

  setAccounts() {
    this.accounts = [
      {
        id: 1,
        name: 'Account 1'
      },
      {
        id: 2,
        name: 'Account 2'
      },
      {
        id: 3,
        name: 'Account 3'
      },
      {
        id: 4,
        name: 'Account 4'
      },
      {
        id: 5,
        name: 'Account 5'
      }
    ]
  }

  back() {
    this.router.navigate(['/customer-services/corporate-360/sweeps/list']);
  }

  submit() {
    const payload = {
      id: 4,
      title: 'Re-initiate failed sweep',
      customerName: 'Okapi Babangida',
      customerCif: '54314864921',
      sourceAccount: 'Current account',
      destinationAccount: 'Investment account',
      sweepName: 'Test',
      startDate: '01/02/2050',
      executionMode: 'Time of day',
      executionDetails: '17:00',
      frequency: 'Weekly',
      holidays: 'Skip'
    }
    this.sweepsService.open(payload);
  }

}
