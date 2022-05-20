import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { CreateHolidayModalComponent } from 'src/app/shared/modals/create-holiday-modal/create-holiday-modal.component';
import { HolidayConfigurationModel } from '../../domain/holiday-config.model';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class HolidayConfigurationService {
  holidays: HolidayConfigurationModel[] = [];
  createHolidayRef: MatDialogRef<CreateHolidayModalComponent, any>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly http: HttpClient) { }

  openNewHoliday(data?: HolidayConfigurationModel): MatDialogRef<CreateHolidayModalComponent, any> {
    this.createHolidayRef = this.dialog.open<CreateHolidayModalComponent, any>(
      CreateHolidayModalComponent,
      {
        width: '25rem',
        disableClose: true,
        data
      }
    );
    return this.createHolidayRef;
  }

  closeNewHoliday(data: any) {
    this.createHolidayRef.close(data);
  }

  saveHoliday(payload: HolidayConfigurationModel) {
    // return this.http.post(`${urlList.fileTemplate.submitFileTemplate}/${payload.corporateId}`, payload);
    console.log(payload)
    const exists = this.holidays.some(holiday => holiday.id === payload?.id);
    if (exists) {
      this.holidays = this.holidays.map(holiday => holiday.id === payload.id ? payload : { ...holiday, id: this.holidays.length + 1 })
    } else {
      this.holidays.push({ ...payload, id: this.holidays.length + 1 });
    }
    return of({ isSuccessful: true, data: this.holidays })
  }

  getHolidays(corporateId: string) {
    // return this.http.get(`${urlList.fileTemplate.submitFileTemplate}/${corporateId}`);
    return of({ isSuccessful: true, data: this.holidays })
  }

  deleteHolidays(corporateId: string, id?: number) {
    // return this.http.get(`${urlList.fileTemplate.submitFileTemplate}/${corporateId}`);
    this.holidays = this.holidays.filter(holiday => holiday.id !== id)
    return of({ isSuccessful: true, data: this.holidays })
  }

}
