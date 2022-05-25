import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayConfigurationModel } from 'src/app/core/domain/holiday-config.model';
import { HolidayConfigurationService } from 'src/app/core/services/holiday-configuration/holiday-configuration.service';
import * as moment from 'moment'

@Component({
  selector: 'app-create-holiday-modal',
  templateUrl: './create-holiday-modal.component.html',
  styleUrls: ['./create-holiday-modal.component.scss']
})
export class CreateHolidayModalComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HolidayConfigurationModel,
    private dialogRef: MatDialogRef<CreateHolidayModalComponent>,
    private readonly holidayConfigurationService: HolidayConfigurationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    console.log(this.data)
    this.data && this.myForm.setValue({
      holidayName: this.data.holidayName,
      holidayDate: this.data.holidayDate
    })
  }

  close() {
    this.dialogRef.close()
  }

  submitHoliday() {
    const value = { ...this.data, ...this.myForm.value, holidayDate: moment(this.myForm.value.holidayDate).format("YYYY-MM-DDTHH:mm:ss"), };
    console.log(value, this.myForm.value);
    this.dialogRef.close(value)
  }

  initForm() {
    this.myForm = new FormGroup({
      holidayName: new FormControl(null, [Validators.required]),
      holidayDate: new FormControl(null, [Validators.required]),
    });
  }

}
