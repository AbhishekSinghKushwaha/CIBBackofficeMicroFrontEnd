import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { TemplateModel } from 'src/app/core/domain/file-template.model';
import { FileTemplateService } from 'src/app/core/services/file-template/file-template.service';

@Component({
  selector: 'app-new-file-templates',
  templateUrl: './new-file-templates.component.html',
  styleUrls: ['./new-file-templates.component.scss']
})
export class NewFileTemplatesComponent implements OnInit {
  step = 0;
  displayedColumns: string[] = ['id', 'name', 'required', 'type', 'businessRules', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  data: TemplateModel[] = [];
  selected = [];
  stage: string;
  completionData: ConfirmationCompletionModel = {
    buttonText: 'Go to Overview',
    message: 'Your request has been submitted for approval',
    subMessage: 'The customer\'s details have been submitted successfully',
    icon: 'assets/images/backgrounds/visual-support-icons-virtual-account-submission-avatar.svg',
  };
  templateForm: FormGroup;

  constructor(
    private readonly fileTemplateService: FileTemplateService,
    private _liveAnnouncer: LiveAnnouncer,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  initForm() {
    this.templateForm = new FormGroup({
      templateName: new FormControl(null, [Validators.required]),
      module: new FormControl(null, [Validators.required]),
    });
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
      .openTemplateBuilder('new', [], [])
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.data = data?.payload;
          this.dataSource.data = this.data;
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
      .openTemplateBuilder('edit', this.data, this.selected)
      .afterClosed()
      .subscribe(data => {
        console.log(data);
        if (data) {
          this.data = data?.payload;
          this.selected = data?.selected;
          this.dataSource.data = this.data;
          this.dataSource.sort = this.sort;
        }
      })
  }

  saveTemplate() {
    this.fileTemplateService
      .saveTemplate({
        ...this.templateForm.getRawValue(),
        corporateId: "cd6724dd56c6481b8be9dadfe1bbf805",
        columns: [...this.data.map((item, i) => ({ ...item, columnId: 0 }))]
      }).subscribe((response: any) => {
        if (response?.isSuccessful) {
          this.stage = 'completed';
        }
        console.log(response);
      })

  }

  confirmationDone(event: any) {
    this.router.navigate(['/customer-services/corporate-360/configurations'])
  }

}
