import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddUsersWorkflowModel } from 'src/app/core/domain/add-users-workflow.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

export type WorkflowStatus = 'active' | 'disabled';

export interface UsersWorkflow {
  name: string;
  id: string;
  role: string;
  status: WorkflowStatus;
  lastviewed: string;
}

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = '';

  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length }`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length} items`;
  };

  return customPaginatorIntl;
}

@Component({
  selector: 'app-sequential-approval-data',
  templateUrl: './sequential-approval-data.component.html',
  styleUrls: ['./sequential-approval-data.component.scss']
})
export class SequentialApprovalDataComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort)
  private sort: MatSort;

  pageSize = 10;
  pageSizes = [5,10,20];

  @ViewChild('paginator') paginator: MatPaginator;

  value = 0;
  usersDisplayedColumns: string[] = [
    'select',
    'name',
    'id',
    'role',
    'status',
    'lastviewed'
  ];

  usersDataSource: MatTableDataSource<AddUsersWorkflowModel>;

  usersSelection = new SelectionModel<AddUsersWorkflowModel>(true, []);


  constructor(
    private readonly dialogRef: MatDialogRef<SequentialApprovalDataComponent>,
  ) { }

  ngOnInit(): void {
    this.addUsersWorkflow();
  }

  close() {
    this.dialogRef.close(true);
  }

  ngAfterViewInit(): void {
    this.usersDataSource.sort = this.sort;
    this.usersDataSource.paginator = this.paginator;
  }

  addUsersWorkflow() {
    this.usersDataSource = new MatTableDataSource();
      const data: AddUsersWorkflowModel[] = [
        {
          name: 'George Okonjo',
          id: '23546987',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20'
        },
        {
          name: 'Okonjo',
          id: '987456321',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20'
        },
        {
          name: 'George',
          id: '123456789',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20'
        },
      ];
    
      this.usersDataSource.data = data;
  }

  usersIsAllSelected() {
    const numSelected = this.usersSelection.selected.length;
    const numRows = this.usersDataSource.data.length;
    return numSelected === numRows;
  }

  usersMasterToggle() {
    this.usersIsAllSelected() ?
        this.usersSelection.clear() :
        this.usersDataSource.data.forEach(row => this.usersSelection.select(row));
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.usersDataSource.filter = filterValue;
  }
  
  incrementValue(event: Event) {
    // this.value = i;
    // this.usersDataSource.data.map((x, i) => {
    //   if(i === index) {
    //     this.value = this.value + 1;
    //   }
    // });
    // event.stopPropagation();
    this.value = this.value + 1;
  }

}
