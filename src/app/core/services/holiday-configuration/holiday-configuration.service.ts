import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { CreateHolidayModalComponent } from 'src/app/shared/modals/create-holiday-modal/create-holiday-modal.component';
import { environment } from 'src/environments/environment';
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

  saveHoliday(payload: any, corporateId: string) {
    return this.http.post(`${environment.apiUrl}${urlList.holidayConfiguration.postHolidays}/${corporateId}`, payload);
  }

  getHolidays(corporateId: string) {
    return this.http.get(`${environment.apiUrl}${urlList.holidayConfiguration.getHolidays}/${corporateId}`);
  }

  deleteHoliday( holidayId: string, corporateId: string) {
    return this.http.put(`${environment.apiUrl}${urlList.holidayConfiguration.deleteHoliday}/${holidayId}`, {});
  }

}
