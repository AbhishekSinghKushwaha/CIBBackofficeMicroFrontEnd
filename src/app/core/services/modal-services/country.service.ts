import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CountryModel } from "../../domain/bank.model";
import { CountryModalComponent } from "src/app/shared/modals/country-modal/country-modal.component";
import { StorageService } from "../utils/storage.service";

@Injectable()
export class CountryService {
  selectedCountry = new Subject<CountryModel>();
  countryData: CountryModel;
  countryModalRef: MatDialogRef<CountryModalComponent, any>;

  constructor(
    private readonly dialog: MatDialog,
    private storageService: StorageService,) { }

  openCountry(data: any) {
    const country = this.storageService.getData("countries");

    this.countryModalRef = this.dialog.open<CountryModalComponent, any>(
      CountryModalComponent,
      {
        maxWidth: "42vw",
        disableClose: true,
        data: { country, ...data },
      }
    );
    return this.countryModalRef;
  }

  get defaultCountry(): CountryModel {
    return this.countryData;
  }

  closeCountryModal(data: { selected: CountryModel, selections: any[]}): void {
    this.countryModalRef.close(data);
  }
}
