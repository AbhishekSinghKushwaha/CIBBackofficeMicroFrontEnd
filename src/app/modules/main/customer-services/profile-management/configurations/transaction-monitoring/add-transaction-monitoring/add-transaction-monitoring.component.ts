import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { CurrencyModel } from 'src/app/core/domain/transfer.models';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';
import { TransactionMonitoringService } from 'src/app/core/services/transaction-monitoring/transaction-monitoring.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction-monitoring',
  templateUrl: './add-transaction-monitoring.component.html',
  styleUrls: ['./add-transaction-monitoring.component.scss']
})
export class AddTransactionMonitoringComponent implements OnInit {
  formData: FormGroup;
  data: any = {
    'Restricted countries': [],
    'Restricted currencies': [],
    'Amount': [],
    'CIF': [],
    'Account numbers': [],
    'Transaction types': []
  }
  options = [
    'Restricted countries',
    'Restricted currencies',
    'Amount',
    'CIF',
    'Account numbers',
    'Transaction types'
  ];
  stage: string;
  completionData: ConfirmationCompletionModel = {
    buttonText: 'Go to Overview',
    message: 'Your request has been submitted for approval',
    subMessage: 'The customer\'s details have been submitted successfully',
    icon: 'assets/images/backgrounds/visual-support-icons-virtual-account-submission-avatar.svg',
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly transactionMonitoringService: TransactionMonitoringService,
    private readonly countryService: CountryService,
    private readonly dataLookUpService: DataLookupService,
    private readonly storageService: StorageService) { }

  ngOnInit(): void {
    this.getCountries();
    this.initiateForm();
    this.addNewLine();
  }

  get refinedOptions() {
    return this.options.filter(x => !Object.keys(this.data).filter(x => this.data[x]?.length).includes(x));
  }

  getCountries() {
    this.dataLookUpService
      .getCountries()
      .subscribe((response: any) => {
        response.status && this.storageService.setData('countries', response.data)
      });
  }

  initiateForm() {
    this.formData = this.fb.group({
      formArray: this.fb.array([])
    });
  }

  get formDataArray() {
    return this.formData.get('formArray') as FormArray;
  }

  addNewLine() {
    this.formDataArray.push(
      this.createFormGroup({
        criteria: null,
        value: null,
      })
    );
  }

  createFormGroup(data?: any) {
    return this.fb.group({
      criteria: [data?.criteria, Validators.required],
      value: [data?.value, Validators.required],
    });
  }

  deleteRow(index: number, criteria: any) {
    this.formDataArray.removeAt(index);
    this.data[criteria] = [];
  }

  confirmationDone(resp: any) {
    this.router.navigate(['/customer-services/corporate-360/configurations/transaction-monitoring/list'])
  }

  openCountry() {
    this.countryService.openCountry({ selections: this.data['Restricted countries']?.map((x: any) => x.countryCode), type: 'checkbox', category: 'country' })
      .afterClosed()
      .subscribe((res) => {
        res?.selections?.length && (this.data['Restricted countries'] = res?.selections)
        console.log(this.data)
      })
  }

  openCurrency() {
    this.countryService.openCountry({ selections: this.data['Restricted currencies'], type: 'checkbox', category: 'currency' })
      .afterClosed()
      .subscribe((res) => {
        this.data['Restricted currencies'] = res?.selections || [];
        console.log(this.data)
      })
  }

  openAmount() {
    this.transactionMonitoringService.openAmount('new', this.data['Amount'], [])
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.data['Amount'] = res?.payload || [];
          console.log(this.data)
        }

      })
  }

  openCIF() {
    this.transactionMonitoringService.openCIF(this.data['CIF'].map((x: any) => x.id))
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.data['CIF'] = res || [];
          console.log(this.data)
        }
      })
  }

  openAccountNumber() {
    this.transactionMonitoringService.openAcccountNumber(this.data['Account numbers'])
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.data['Account numbers'] = res || [];
          console.log(this.data)
        }

      })
  }

  openTranscationTypes() {
    this.transactionMonitoringService.openTransactionTypes(this.data['Transaction types'].map((x: any) => x.id))
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.data['Transaction types'] = res || [];
          console.log(this.data)
        }

      })
  }

  openData(i: string) {
    switch (i) {
      case 'Restricted countries': this.openCountry()
        break;
      case 'Restricted currencies': this.openCurrency()
        break;
      case 'Amount': this.openAmount()
        break;
      case 'CIF': this.openCIF()
        break;
      case 'Account numbers': this.openAccountNumber()
        break;
      case 'Transaction types': this.openTranscationTypes()
        break;
      default:
        break;
    }
  }

  submit() {
    const payload = {
      restrictedCountries: this.data['Restricted countries'].map((x: any) => x.countryCode),
      restrictedCurrencies: this.data['Restricted currencies'].map((x: any) => x.currency),
      restrictedAmounts: this.data['Amount'].map((x: any) => ({ amount: x.amount, currencyCode: x.currency.currencyCode })),
      restrictedCompanyCIF: this.data['CIF'].map((x: any) => x.cif),
      restrictedAccountNumbers: this.data['Account numbers'].map((x: any) => String(x)),
      restrictedTransactionTypes: this.data['Transaction types'].map((x: any) => x.id),
    }
    console.log(payload);
    this.transactionMonitoringService.saveCriteria(payload)
      .subscribe((result: any) => {
        console.log(result)
        result.isSuccessful && (this.stage = 'completed')
      })
  }
}
