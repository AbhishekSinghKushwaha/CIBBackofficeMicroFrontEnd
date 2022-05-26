import { Component, OnInit } from '@angular/core';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface Approval {
  text: string;
  subtext: string;
}

@Component({
  selector: 'app-transaction-approval-details',
  templateUrl: './transaction-approval-details.component.html',
  styleUrls: ['./transaction-approval-details.component.scss']
})
export class TransactionApprovalDetailsComponent implements OnInit {

  transactionApprovalDetailsForm: FormGroup;

  callBackDetailsForm: FormGroup;

  constructor(
    private readonly biometricVerificationService: BiometricVerificationService,
    private readonly fb: FormBuilder,
    private router: Router
  ) { }

  get getForm() {
    return this.transactionApprovalDetailsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.callBack();
  }

  initForm(): void {
    this.transactionApprovalDetailsForm = this.fb.group({
      approval: ['', [Validators.required]],
    });
  }

  callBack() {
    this.callBackDetailsForm = new FormGroup({
      callBackDetails: new FormArray([
        new FormGroup({
          callBackPerson: new FormControl(''),
          dateContacted: new FormControl(''),
          timeContacted: new FormControl(''),
          mobileNumber: new FormControl('')
        })
      ])
    });
  }

  get callBackDetails(): FormArray {
    return this.callBackDetailsForm.get('callBackDetails') as FormArray;
  }

  addCallBackDetails() {
    this.callBackDetails.push(
      new FormGroup({
        callBackPerson: new FormControl(''),
        dateContacted: new FormControl(''),
        timeContacted: new FormControl(''),
        mobileNumber: new FormControl('')
      })
    );
  }

  approval: Approval[] = [
    {text: 'Approve', subtext: 'The details provided by the maker are all okay.'},
    {text: 'Return', subtext: 'The details provided by the maker need correction.'},
    {text: 'Reject', subtext: 'The details provided by the maker are not genuine.'},
  ];

  Submit() {
    this.biometricVerificationService.open();
  }

}
