import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCheckersWorkflowModel } from 'src/app/core/domain/add-checkers-workflow.model';
import { AddUsersWorkflowModel } from 'src/app/core/domain/add-users-workflow.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { SequentialApprovalService } from 'src/app/core/services/sequential-approval/sequential-approval.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';

export type WorkflowStatus = 'active' | 'disabled';

export interface Transaction {
  transactionname: string;
}

export interface UsersWorkflow {
  name: string;
  id: string;
  role: string;
  status: WorkflowStatus;
  lastviewed: string;
}

export interface CheckersWorkflow {
  name: string;
  id: string;
  profiletype: string;
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
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.scss']
})
export class CreateWorkflowComponent implements OnInit, AfterViewInit {
  createWorkflowMangementForm: FormGroup;

  panelOpenState = {
    additionalInfo: false,
    mandate: true,
    signatories: false
  };

  pageSize = 10;
  pageSizes = [5,10,20];

  id: number;
  mode: any;

  @ViewChild(MatSort)
  private sort: MatSort;

  @ViewChild('paginator') paginator: MatPaginator;

  @ViewChild('checkersPaginator') checkersPaginator: MatPaginator;

  usersDisplayedColumns: string[] = [
    'select',
    'name',
    'id',
    'role',
    'status',
    'lastviewed'
  ];

  checkersDisplayedColumns: string[] = [
    'select',
    'name',
    'id',
    'profiletype',
    'status',
    'lastviewed'
  ];

  usersDataSource: MatTableDataSource<AddUsersWorkflowModel>;

  checkersDataSource: MatTableDataSource<AddCheckersWorkflowModel>;


  transactions: Transaction[] = [
    {
      transactionname: 'Internal Fund Transfer',
    },
    {
      transactionname: 'IntraBank Fund Transfer',
    },
    {
      transactionname: 'ETF/RTGS Transfer',
    },
    {
      transactionname: 'Tax Payment',
    },
    {
      transactionname: 'International funds transfer',
    },
    {
      transactionname: 'Bulk Payment',
    },
    {
      transactionname: 'Salary Payment',
    },
    {
      transactionname: 'Utility Payment',
    },
    {
      transactionname: 'Card Payment',
    },
    {
      transactionname: 'Inter Country Transfers',
    },
    {
      transactionname: 'Pesalink Transfer',
    },
    {
      transactionname: 'Standing Instruction',
    }
  ]

  usersSelection = new SelectionModel<AddUsersWorkflowModel>(true, []);
  checkersSelection = new SelectionModel<AddCheckersWorkflowModel>(true, []);

  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sequentialApprovalService: SequentialApprovalService,
    private readonly router: Router,
    private readonly biometricVerificationService: BiometricVerificationService,
  ) { 
    this.id = route.snapshot.params['id'];
    this.mode = route.snapshot.params['mode'];
  }

  ngOnInit(): void {
    this.initForm();
    this.addCheckersWorkflow();
    this.addUsersWorkflow();
  }

  initForm(): void {
    this.createWorkflowMangementForm = this.fb.group({
      companyname: ['', [Validators.required]],
      workflowname: ['', [Validators.required]],
      workflowdescription: ['', [Validators.required]],
      approvers: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      minimumamount: ['', [Validators.required]],
      maximumamount: ['', [Validators.required]],
      accountsaccess: ['', [Validators.required]],
    });
  }

  addUsersWorkflow() {
    this.usersDataSource = new MatTableDataSource();
      const data: AddUsersWorkflowModel[] = Array(3).fill(0).map((x,i) => ({
          name: 'George Okonjo',
          id: '23546987',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20'
      }));
    
      this.usersDataSource.data = data;
  }

  addCheckersWorkflow() {
    this.checkersDataSource = new MatTableDataSource();
      const data: AddCheckersWorkflowModel[] = Array(5).fill(0).map((x,i) => ({
          name: 'George Okonjo',
          id: '23546987',
          profiletype: 'Individual',
          status: 'Active',
          lastviewed: '12/02/21'
      }));
    
      this.checkersDataSource.data = data;
  }

    
  ngAfterViewInit(): void {
    this.usersDataSource.sort = this.sort;
    this.checkersDataSource.sort = this.sort;
    this.usersDataSource.paginator = this.paginator;
    this.checkersDataSource.paginator = this.checkersPaginator;
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

  checkersIsAllSelected() {
    const numSelected = this.checkersSelection.selected.length;
    const numRows = this.checkersDataSource.data.length;
    return numSelected === numRows;
  }

  checkersMasterToggle() {
    this.checkersIsAllSelected() ?
        this.checkersSelection.clear() :
        this.checkersDataSource.data.forEach(row => this.checkersSelection.select(row));
  }

  openSequentialApproval() {
    this.sequentialApprovalService.open();
  }

  quit() {
    this.router.navigate(['/customer-services/corporate-360/configurations/workflow-management']);
  }

  back() {
    this.router.navigate(['/customer-services/corporate-360/configurations/workflow-management']);
  }

  submit() {
    this.biometricVerificationService.open();
  }

}
