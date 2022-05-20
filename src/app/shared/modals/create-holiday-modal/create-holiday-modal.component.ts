import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayConfigurationModel } from 'src/app/core/domain/holiday-config.model';
import { HolidayConfigurationService } from 'src/app/core/services/holiday-configuration/holiday-configuration.service';

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
      name: this.data.name,
      date: this.data.date
    })
  }

  close() {
    this.dialogRef.close()
  }

  submitHoliday() {
    this.holidayConfigurationService
      .saveHoliday({ ...this.data, ...this.myForm.value })
      .subscribe(data => this.dialogRef.close(this.myForm.value));
  }

  initForm() {
    this.myForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    });
  }

}
