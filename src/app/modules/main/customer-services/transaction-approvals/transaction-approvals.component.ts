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
import { TransactionApprovalService } from 'src/app/core/services/transaction-approval/transaction-approval.service';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';

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
      return `0 of ${length }`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
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

  dataSource: MatTableDataSource<any>;

  searchControl: FormControl = new FormControl({ value: '', disabled: false });

  selection = new SelectionModel<UserListModel>(true, []);
  searchText: string;

  pageSize = 10;
  pageSizes = [5,10,20];

  searchType: any;

  requestReference: any
  approvalStatus: any;
  accountNumber: any;
  bankId: any;

  constructor(
    private router: Router,
    private readonly transactionApprovalService: TransactionApprovalService,
    private readonly confirmationService: ConfirmationService
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
    // this.onLoadData();
    this.getTransactions();
  }

  getTransactions() {
    this.dataSource = new MatTableDataSource();
    this.transactionApprovalService.getTransactions().subscribe((res: any) => {
      console.log(res.data);
      this.dataSource.data = res.data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openActionsMenu(user: any) {
    console.log(user);

    const payload = {
      type: 'approval',
      requestReference : user.requestReference,
      approvalStatus : user.approvalStatus,
      accountName: user.sourceAccountName,
      accountNumber : user.sourceAccount,
      bankId : user.bankId,
      cif : user.cif,
      transferCharge: user.transferCharge,
      amount: user.amount,
      currency: user.currency,
      // documents: user.documents,
      documents: [
        {
          name: 'test 1',
          size: '1.2mb'
        },
        {
          name: 'test 2',
          size: '1.2mb'
        },
        {
          name: 'test 3',
          size: '1.2mb'
        },
      ]
    }

    this.confirmationService.confirmationDetails(payload);
    this.requestReference = user.requestReference;
    this.router.navigate([`/customer-services/transaction-approvals/details/${this.requestReference}`]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  approve() {
    this.router.navigate(['/customer-services/success']);
  }

  closeFilter(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  onSelected(item: any) {
    console.log(item);
    this.searchType = item;
    this.filterByType(item.text);
  }

  filterByType(filterValue: any) {
    switch (filterValue) {
      case 'Corporate name':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.sourceAccountName && data.sourceAccountName.toLowerCase().includes(filter);
        };
        break;
      case 'Transaction type':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.transferType && data.transferType.toLowerCase().includes(filter);
        }
        break;  
      case 'Account number':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.requestReference && data.requestReference.toLowerCase().includes(filter);
        }
        break;
      case 'Corporate reference':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.requestReference && data.requestReference.toLowerCase().includes(filter);
        }
        break;
      case 'Corporate CIiff':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.cif.toLowerCase().includes(filter);
        }
        break;
      case 'Date':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.date && data.date.toLowerCase().includes(filter);
        }
        break;
      case 'Company CIF':
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.cif && data.cif.toLowerCase().includes(filter);
        }
        break;
      default:
        break;              
    }
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
