import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { FileTemplateService } from 'src/app/core/services/file-template/file-template.service';

@Component({
  selector: 'app-new-file-templates',
  templateUrl: './new-file-templates.component.html',
  styleUrls: ['./new-file-templates.component.scss']
})
export class NewFileTemplatesComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = ['id', 'name', 'required', 'type', 'businessRule', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  data = [];
  stage: string;
  completionData: ConfirmationCompletionModel = {
  buttonText: 'Go to Overview',
  message: 'Your request has been submitted for approval',
  subMessage: 'The customer\'s details have been submitted successfully',
  icon: 'assets/images/backgrounds/visual-support-icons-virtual-account-submission-avatar.svg',
  category: 'small',
};

  constructor(
    private readonly fileTemplateService: FileTemplateService,
    private _liveAnnouncer: LiveAnnouncer,
    private readonly router:Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openTemplateBuilder() {
    this.fileTemplateService
      .openTemplateBuilder('new')
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.data = data;
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
        }
      })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editTemplate() {
    this.fileTemplateService
      .openTemplateBuilder('edit')
      .afterClosed()
      .subscribe()
  }

  saveTemplate() {
    this.stage = 'completed';
  }

  confirmationDone(event: any) {
    this.router.navigate(['/customer-services/corporate-360/configurations'])
  }

}
