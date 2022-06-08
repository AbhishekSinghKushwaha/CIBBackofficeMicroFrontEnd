import { Component, OnInit } from '@angular/core';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  accountDetails: any

  requestReference: any;

  transactionDetails: any;

  constructor(
    private readonly biometricVerificationService: BiometricVerificationService,
    private readonly fb: FormBuilder,
    private router: Router,
    private readonly transactionApprovalService: TransactionApprovalService,
    private readonly route: ActivatedRoute,
  ) {
    this.requestReference = route.snapshot.params['id'];
   }

  get getForm() {
    return this.transactionApprovalDetailsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.callBack();
    this.getAccountDetails();
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

  getAccountDetails() {
    this.transactionApprovalService.currentData.subscribe((data) => {
      this.transactionDetails = data;
      console.log(data, "transactionDetails");
    });
    if(this.transactionDetails) {
      this.transactionApprovalService.getAccountDetails(this.transactionDetails.accountNumber, this.transactionDetails.bankId).subscribe((res: any) => {
        this.accountDetails = res.data;
        console.log(this.accountDetails);
      });
    }
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
      requestReference : this.requestReference,
      corporateId: this.accountDetails.cif,
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
