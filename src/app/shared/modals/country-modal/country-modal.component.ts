import { CountryModel } from "src/app/core/domain/bank.model";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { countrySettings } from "../../utils/country.settings";
import { SelectionModel } from "@angular/cdk/collections";

interface IData {
  country: CountryModel[];
  category: 'country' | 'currency';
  type: 'radio' | 'checkbox';
  selections: any;
}
@Component({
  selector: "app-country-modal",
  templateUrl: "./country-modal.component.html",
  styleUrls: ["./country-modal.component.scss"],
})
export class CountryModalComponent implements OnInit {
  selected: CountryModel;
  viewTypes = countrySettings.viewTypes;
  searchText: string;
  selections = new SelectionModel<string>(true, []);
  labelPosition: any;

  constructor(
    private readonly countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {
    this.selected = data.selections;
  }

  ngOnInit(): void {
    for (const selection of this.data.selections) {
      this.selections.select(selection);
    }
  }

  close(): void {
    this.countryService.closeCountryModal({ selected: this.selected, selections: this.selections.selected.map(x => this.data.country.find(y => y.countryCode === x))});
  }
}
