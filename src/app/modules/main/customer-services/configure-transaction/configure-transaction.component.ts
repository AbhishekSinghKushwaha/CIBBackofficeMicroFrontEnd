import { TransactionConfigurationService } from './../../../../core/services/transaction-configuration/transaction-configuration.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

interface Approval {
  text: string;
  subtext: string;
}

@Component({
  selector: 'app-configure-transaction',
  templateUrl: './configure-transaction.component.html',
  styleUrls: ['./configure-transaction.component.scss']
})
export class ConfigureTransactionComponent implements OnInit {

  transactionApprovalDetailsForm: FormGroup;
  transactionType: any[] = [];
  subdiaries: any[] = [];
  areas: any[] = [];
  chargeEvents: any[] = [];
  selectedTransferType: any;

  callBackDetailsForm: FormGroup;
  transactionConfigurationForm: FormGroup;
  selection = new SelectionModel<any>(true, []);
  formData: FormGroup = new FormGroup({});
  dataSources = [new MatTableDataSource<any>([])];
  displayedColumns: string[] = ['id', 'min', 'max', 'amountPercentage', 'fixed', 'multiplicity', 'glAccount', 'action'];


  constructor(
    private readonly biometricVerificationService: BiometricVerificationService,
    private readonly fb: FormBuilder,
    private transactionConfigurationService: TransactionConfigurationService,
    private router: Router,
  ) { }

  get getForm() {
    return this.transactionApprovalDetailsForm.controls;
  }
  get ChargesControls() {
    return this.transactionConfigurationForm.controls.charges;
  }

  ngOnInit(): void {
    this.initConfigurationForm();
    this.getTransactionType();
    this.getTransactionArea();
    this.getTransactionSubdiaries();
    this.getTransactionChargeEvent();
  }

  initiateFormArray() {
    this.formData = this.fb.group({
      formArray: this.fb.array([])
    });
  }

  initConfigurationForm(): void {
    this.transactionConfigurationForm = this.fb.group({
      subsidiary: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      maxTransAmount: [0, [Validators.required]],
      minTransAmount: [0, [Validators.required]],
      bankCharges: [0, [Validators.required]],
      charge: [0, [Validators.required]],
      chargeEvent: ['', [Validators.required]],
      minAmtForDoc: [0, [Validators.required]],
      area: [0, [Validators.required]],
      mandateDoc: [false, [Validators.required]],
      useNstp: [false, [Validators.required]],
      charges: new FormArray([
        this.initCharge()
      ])
    })
    this.setdataTable(this.ChargesControls, 0);
  }
  get chargesArray() {
    return this.transactionConfigurationForm.get('charges') as FormArray
  }

  initCharge() {
    return new FormGroup({
      chargeTitle: new FormControl(''),
      values: new FormArray([
      ])
    })
  }

  addCharge() {
    const control = <FormArray>this.transactionConfigurationForm.get('charges');
    control.push(this.initCharge());
  }


  setdataTable(tableArray?: any, index?: any) {
    const chargesArray = <FormArray>this.chargesArray.controls[index].get('values')
    this.dataSources[index].data = tableArray ? tableArray.controls[index].controls.values.controls : chargesArray.controls;

    const filterPredicate = this.dataSources[index].filterPredicate;
    this.dataSources[index].filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSources[index], data.value, filter);
    }
  }

  createFormGroup() {

    return this.fb.group({
      minimumAmount: [0, Validators.required],
      maximumAmount: [0, Validators.required],
      percentCharge: [0, Validators.required],
      fixedAmount: [0, Validators.required],
      multiplier: [0, Validators.required],
      glAccount: ['', Validators.required]
    });
  }

  editRow(element: any) {
    element.patchValue({ edit: true })
  }

  removeRow(index: any, tableArray: any) {
    const charges = <FormArray>this.chargesArray.controls[index].get('values')

    charges.controls.splice(index, 1);
    this.setdataTable(null, index);
  }

  addNewLine(tableArray: any, index: any) {
    this.dataSources.push(new MatTableDataSource<any>([]))
    tableArray.push(
      this.createFormGroup()
    );
    this.setdataTable(this.transactionConfigurationForm.controls.charges, index);
  }

  getSections(form: any) {
    return form.controls.charges.controls;
  }

  isAllSelected(index: any) {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSources[index].data.length;
    return numSelected === numRows;
  }
  masterToggle(index: any) {
    if (this.isAllSelected(index)) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSources[index].data);
  }
  getTransactionType() {
    this.transactionConfigurationService.getTransactionConfigurationChargeTranstype().subscribe((res) => {
      if (res.isSuccessful) {
        this.transactionType = res.data
      }
    })
  }

  getTransactionSubdiaries() {
    this.transactionConfigurationService.getTransactionConfigurationChargeSubsidiary().subscribe((res) => {
      if (res.isSuccessful) {
        this.subdiaries = res.data
      }
    })
  }

  getTransactionChargeEvent() {
    this.transactionConfigurationService.getTransactionConfigurationChargeEvent().subscribe((res) => {
      if (res.isSuccessful) {
        this.chargeEvents = res.data
      }
    })
  }

  getTransactionArea() {
    this.transactionConfigurationService.getTransactionConfigurationArea().subscribe((res) => {
      if (res.isSuccessful) {
        this.areas = res.data
      }
    })
  }

  setSelectedTransferType(transType: any) {
    this.selectedTransferType = transType;
  }



  get callBackDetails(): FormArray {
    return this.callBackDetailsForm.get('callBackDetails') as FormArray;
  }

  Submit() {
    const charges = this.transactionConfigurationForm.get('charges')?.value.map((charge: any) => ({ [charge.chargeTitle]: charge.values }))
    const payload = {
      "type": this.selectedTransferType.id,
      "subsidiary": this.transactionConfigurationForm.get('subsidiary')?.value,
      "currency": this.transactionConfigurationForm.get('currency')?.value,
      "maxTransAmount": this.transactionConfigurationForm.get('maxTransAmount')?.value,
      "minTransAmount": this.transactionConfigurationForm.get('minTransAmount')?.value,
      "bankCharges": this.transactionConfigurationForm.get('bankCharges')?.value,
      "charge": this.transactionConfigurationForm.get('charge')?.value,
      "chargeEvent": this.transactionConfigurationForm.get('chargeEvent')?.value,
      "minAmtForDoc": this.transactionConfigurationForm.get('minAmtForDoc')?.value,
      "area": this.transactionConfigurationForm.get('area')?.value,
      "mandateDoc": this.transactionConfigurationForm.get('mandateDoc')?.value,
      "useNstp": this.transactionConfigurationForm.get('useNstp')?.value,
      "charges": Object.assign({}, ...charges)
    }
    this.transactionConfigurationService.postTransactionConfiguration(payload).subscribe((response: any) => {
      if (response.isSuccessful) {
        this.router.navigate(['/customer-services/transaction-approvals/success']);
      }
    })
  }

}
