import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HolidayConfigurationModel } from 'src/app/core/domain/holiday-config.model';
import { HolidayConfigurationService } from 'src/app/core/services/holiday-configuration/holiday-configuration.service';
import * as moment from 'moment';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { confirmModal } from 'src/app/shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-list-holidays',
  templateUrl: './list-holidays.component.html',
  styleUrls: ['./list-holidays.component.scss']
})
export class ListHolidaysComponent implements OnInit {
  ELEMENT_DATA: HolidayConfigurationModel[] = [];
  stage: string;
  displayedColumns: string[] = ['name', 'makerName', 'date', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  completionData: ConfirmationCompletionModel = {
    buttonText: 'Go to Overview',
    message: 'You\'re all done!',
    subMessage: 'The customer\'s details have been submitted successfully',
    icon: 'assets/images/backgrounds/visual-support-icons-virtual-account-submission-avatar.svg',
  };

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private readonly holidayConfigurationService: HolidayConfigurationService,) { }

  ngOnInit(): void {
    this.getHolidays();
  }

  getHolidays() {
    this.holidayConfigurationService.getHolidays('cd6724dd56c6481b8be9dadfe1bbf805')
      .subscribe((response: any) => {

        if (response.isSuccessful) {
          this.ELEMENT_DATA = response.data;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      })
  }

  addNewHoliday(data?: HolidayConfigurationModel) {
    this.holidayConfigurationService
      .openNewHoliday(data)
      .afterClosed()
      .subscribe((response) => {

        this.holidayConfigurationService.saveHoliday(response, 'cd6724dd56c6481b8be9dadfe1bbf805')
          .subscribe((hols: any) => {

            if (response.isSuccessful) {
              this.getHolidays();
              this.stage = 'completed'
            }
          })
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  edit(data: HolidayConfigurationModel) {
    this.addNewHoliday(data)
  }

  @confirmModal({
    title: "Delete Holiday",
    message: "Are you sure you want to delete this holiday",
    cancelText: "Cancel",
    confirmText: "Yes, delete",
  })
  delete(data: HolidayConfigurationModel) {
    this.holidayConfigurationService
      .deleteHoliday(data.holidayId, 'cd6724dd56c6481b8be9dadfe1bbf805')
      .subscribe((response) => {
        // this.getHolidays();
      })
  }

  confirmationDone(event: any) {
    this.stage = "";
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
