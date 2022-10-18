import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SweepsService } from 'src/app/core/services/sweeps/sweeps.service';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';

@Component({
  selector: 'app-setup-sweep',
  templateUrl: './setup-sweep.component.html',
  styleUrls: ['./setup-sweep.component.scss']
})
export class SetupSweepComponent implements OnInit {

  setupSweepForm: FormGroup;
  setupSweepDetailsForm: FormGroup;

  accounts: any = [];
  mode: boolean = false;
  chargeEvents: any = [];
  error: boolean = false;
  executionModeValue: any;
  holidaysValue: any;

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
    this.error = false;
  }

  intiForm(): void {
    this.setupSweepForm = this.fb.group({
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

  setSelectedAccount(data: any) {
    console.log(data, 'data');
    // this.accounts = this.accounts.filter(item => item.id !== data.id);
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

  next() {
    this.mode = true;
  }

  back() {
    this.router.navigate(['/customer-services/corporate-360/sweeps/list']);
  }

  setExecutionMode(mode: any) {
    switch(mode.id){
      case 1: 
        this.executionModeValue = "End_of_Day";
        break;
      case 2: 
        this.executionModeValue = "Beginning_of_Day";
        break;
      case 3:
        this.executionModeValue = "Time_of_Day";
        break;
      case 4: 
        this.executionModeValue = "Min_Account_Balance";
        break;
      case 5: 
        this.executionModeValue = "Max_Account_Balance";
        break;
      default:
        break;           
    }
  }

  setHolidays(value: any) {
    switch(value.id) {
      case 1:
        this.holidaysValue = "Skip";
        break;
      case 2:
        this.holidaysValue = "Execute_day_before";
        break;
      case 3:
        this.holidaysValue = "Execute_next_working_day";
        break;
      default:
        break;    
    }
  }

  submit() {
    this.setExecutionMode(this.getSweepDetailsForm.executionMode.value);
    this.setHolidays(this.getSweepDetailsForm.holidays.value);

    const payload = {
      sourceAccount: this.getForm.sourceAccount.value.name,
      destinationAccount: this.getForm.destinationAccount.value.name,
      sweepName: this.getSweepDetailsForm.sweepName.value,
      startDate: this.getSweepDetailsForm.startDate.value.toISOString(),
      execution: this.getSweepDetailsForm.frequency.value.name,
      executionMode: this.executionModeValue,
      holidaysAndWeekendsExecution: this.holidaysValue
    }

    console.log(payload, "payload");

    this.sweepsService.setUpSweep(payload).subscribe((res: any) => {
      if(res.isSuccessful){
        this.biometricVerificationService.open();
      }
    })
    // this.biometricVerificationService.open();
  }
}
