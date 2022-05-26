import { Component, OnInit } from '@angular/core';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionApprovalService } from 'src/app/core/services/transaction-approval/transaction-approval.service';

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

  statusConverted: any;

  constructor(
    private readonly biometricVerificationService: BiometricVerificationService,
    private readonly fb: FormBuilder,
    private router: Router,
    private readonly transactionApprovalService: TransactionApprovalService
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
      status: ['', [Validators.required]],
      comments: ['']
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

  statusConversion() {
    switch (this.getForm.status.value) {
      case 'Approve':
        this.statusConverted = 'Approved';
        break;
      case 'Return':
        this.statusConverted = 'Returned';
        break;
      case 'Reject':
        this.statusConverted = 'Declined';     
    }
  }

  Submit() {
    this.statusConversion();
    // this.biometricVerificationService.open();
    let data = this.callBackDetailsForm.get('callBackDetails') as FormArray;

    const payload = {
      transactionReference : 'string',
      requestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: this.statusConverted,
      comments: this.getForm.comments.value,
      callBacks: data.value
    }

    console.log(payload, "payload");

    this.transactionApprovalService.submitTransaction(payload).subscribe((res: any) => {
      console.log(res);
      if(res.isSuccessful) {
        this.biometricVerificationService.open();
      }
    });
  }

}
