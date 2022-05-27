import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TemplateModel } from 'src/app/core/domain/file-template.model';
import { FileTemplateService } from 'src/app/core/services/file-template/file-template.service';


@Component({
  selector: 'app-configure-file-templates-modal',
  templateUrl: './configure-file-templates-modal.component.html',
  styleUrls: ['./configure-file-templates-modal.component.scss']
})
export class ConfigureFileTemplatesModalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'required', 'type', 'businessRules', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<TemplateModel>(true, []);
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  formData: FormGroup = new FormGroup({});
  dataSource = new MatTableDataSource<any>([]);

  allData: TemplateModel[];

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private readonly fileTemplateService: FileTemplateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    console.log({ data: this.data })
    this.initiateForm();
    if (this.data?.payload?.length) {
      for (let i = 0; i < this.data.payload.length; i++) {
        this.formDataArray.push(
          this.createFormGroup(this.data.payload[i])
        );
      }
      this.setdataTable();
      for (const selection of this.data.selected) {
        this.selection.select(selection);
      }
    } else {
      this.addNewLine()
    }
  }

  setdataTable() {
    console.log(this.formDataArray.controls);
    this.dataSource.data = this.formDataArray.controls;
    this.dataSource.sortingDataAccessor = (data: AbstractControl, sortHeaderId: string) => {
      const value: any = data.value[sortHeaderId];
      return typeof value === "string" ? value.toLowerCase() : value;
    };

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    }
  }

  get formDataArray() {
    return this.formData.get('formArray') as FormArray;
  }

  initiateForm() {
    this.formData = this.fb.group({
      formArray: this.fb.array([])
    });
  }

  createFormGroup(data: TemplateModel) {
    console.log(this.formDataArray.controls);

    for (const control of this.formDataArray.controls) {
      control.valid && control.patchValue({ edit: false })
    }

    return this.fb.group({
      name: [data.name, Validators.required],
      required: [data.required, Validators.required],
      type: [data.type, Validators.required],
      businessRules: [data.businessRules, Validators.required],
      edit: [true],
      check: [false],
    });
  }

  editRow(element: any) {
    element.patchValue({ edit: true })
  }

  removeRow(index: any) {
    this.formDataArray.controls.splice(index, 1);
    this.setdataTable();
  }

  addNewLine() {
    this.formData.status === 'VALID' && this.formDataArray.push(
      this.createFormGroup({
        name: '',
        required: '',
        type: '',
        businessRules: '',
        edit: true,
        check: false
      })
    );
    this.setdataTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.data.action === 'edit') {
      this.displayedColumns.unshift('select');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log(this.selection)
  }


  addColumn() {
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  submit() {
    this.fileTemplateService.closeTemplateBuilder({ payload: this.formData.value.formArray, selected: this.selection.selected });
  }

}
