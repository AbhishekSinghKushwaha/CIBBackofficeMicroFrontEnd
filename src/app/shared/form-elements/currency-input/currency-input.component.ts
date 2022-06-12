import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  CurrencyModel,
  FromAccount,
  TransferAmount,
} from "src/app/core/domain/transfer.models";
import { DataLookupService } from "src/app/core/services/data-lookup/data-lookup.service";
import { CurrencySelectionService } from "src/app/core/services/modal-services/currency-selection.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
import { StorageService } from "src/app/core/services/utils/storage.service";
import SharedUtils from "../../utils/shared.util";

@Component({
  selector: "app-currency-input",
  templateUrl: "./currency-input.component.html",
  styleUrls: ["./currency-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public name!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input()
  currency: CurrencyModel;

  public value: TransferAmount = {
    amount: 0,
    currency: "",
    isWithinLimit: true,
  };

  sendFromAccount: FromAccount;

  public changed!: (value: TransferAmount) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  subscriptions: Subscription[] = [];

  constructor(
    public readonly currencySelectionService: CurrencySelectionService,
    private readonly transferFromService: TransferFromService,
    private readonly storageService: StorageService,
    private readonly dataLookupService: DataLookupService
  ) { }

  ngOnInit(): void {
    this.listenToDataEvents();
  }

  ngOnDestroy(): void {
    SharedUtils.unSubscribe(this.subscriptions);
  }

  // Listen to events, pick the sendFrom data
  async listenToDataEvents() {
    // Get Selected Currency
    this.subscriptions.push(
      this.currencySelectionService.selected.subscribe((x) => {
        x && (this.currency = x) || (this.currency = { currencyCode: "", currencyDescription: "" });
        this.fieldName &&
          this.parentForm.controls[this.fieldName].setValue(
            this.currency
          );
      })
    );

  }

  public writeValue(value: TransferAmount): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Open Currency Modal
   * @param supportedCurrencies
   */
  openCurrencyModal() {
    this.dataLookupService.getCurrencies().subscribe((res) => {
      if (res.status) {
        this.storageService.setData("currencies", res.data)
        this.currencySelectionService.open(res.data);
      }
    });
  }


  // Get limits of the account

  // Determine if account is more than 10,000,000
}
