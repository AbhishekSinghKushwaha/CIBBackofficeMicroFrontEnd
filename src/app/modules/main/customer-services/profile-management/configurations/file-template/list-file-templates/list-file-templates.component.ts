import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileTemplateService } from 'src/app/core/services/file-template/file-template.service';
import * as moment from 'moment';

export interface FileTemplateModel {
  name: string;
  module: string;
  user: string;
  created: any;
}

const ELEMENT_DATA: FileTemplateModel[] = [];

@Component({
  selector: 'app-list-file-templates',
  templateUrl: './list-file-templates.component.html',
  styleUrls: ['./list-file-templates.component.scss']
})
export class ListFileTemplatesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['prefix', 'name', 'module', 'user', 'created'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private readonly fileTemplateService: FileTemplateService,) { }

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.fileTemplateService.getTemplates('cd6724dd56c6481b8be9dadfe1bbf805')
      .subscribe((response: any) => {
        console.log(response);
        if (response.isSuccessful) {
          for (const item of response.data) {
            ELEMENT_DATA.push({ name: item.templateName, module: item.module, user: 'Unset', created: moment(item.createdAt) })
          }
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
