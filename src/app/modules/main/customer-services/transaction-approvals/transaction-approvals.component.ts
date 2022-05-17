import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserListModel } from 'src/app/core/domain/user.model';
import { Router } from '@angular/router';

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
  subtext: string;
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

  constructor(
    private router: Router
  ) { }

  approval: Approval[] = [
    {text: 'Company CIF', subtext: 'The details provided by the maker are all okay.'}
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

}
