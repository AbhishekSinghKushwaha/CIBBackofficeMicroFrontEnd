import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserListModel } from 'src/app/core/domain/user.model';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

export type UserStatus = 'approved' | 'rejected' | 'pending';

export interface User {
  name: string;
  date: string;
  paymentType: string;
  bankReference: string;
  corporateReference: string;
  recepientName: string;
  amount: string;
  transactionType: string;
  status: UserStatus;
}

interface Approval {
  text: string;
}

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Rows per page';

  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 à ${length }`;
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
  selector: 'app-transaction-approvals',
  templateUrl: './transaction-approvals.component.html',
  styleUrls: ['./transaction-approvals.component.scss']
})
export class TransactionApprovalsComponent implements OnInit, AfterViewInit  {
  private users: UserListModel[];

  @ViewChild(MatSort)
  private sort: MatSort;

  @ViewChild('trigger') trigger: any;

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = [
    'select',
    'name',
    'date',
    'paymentType',
    'bankReference',
    'corporateReference',
    'recepientName',
    'amount',
    'transactionType',
    'status',
    'actions'
  ];

  filterByColumns: string[] = [
    'name',
    'transactionType',
    'corporateReference',
    'date',
  ]

  dataSource: MatTableDataSource<UserListModel>;

  searchControl: FormControl = new FormControl({ value: '', disabled: false });

  selection = new SelectionModel<UserListModel>(true, []);
  searchText: string;

  pageSize = 10;
  pageSizes = [5,10,20];

  searchType: any;

  constructor(
    private router: Router
  ) { }

  filterItems: Approval[] = [
    {text: 'Corporate name'},
    {text: 'Transaction type'},
    {text: 'Account number'},
    {text: 'Corporate reference'},
    {text: 'Corporate CIiff'},
    {text: 'Date'},
    {text: 'Company CIF'}
  ];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
      const data: UserListModel[] = Array(10).fill(0).map((x,i) => ({
          name: 'Apple',
          date: '01/01/2020',
          paymentType: 'Bulk Transfer',
          bankReference: '123456789',
          corporateReference: '123456789',
          recepientName: 'Jacques Muller',
          amount: '100',
          transactionType: 'Bulk Transfer',
          status: i % 2 === 0 ? 'Pending' : 'Approved'
      }));
       
      this.dataSource.data = data;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openActionsMenu(user: User) {
    console.log(user);
    this.router.navigate(['/customer-services/transaction-approvals/details']);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openFilterModal(){

  }

  approve() {
    this.router.navigate(['/customer-services/transaction-approvals/success']);
  }

  closeFilter(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  onSelected(item: any) {
    console.log(item);
    this.searchType = item;
  }

}
