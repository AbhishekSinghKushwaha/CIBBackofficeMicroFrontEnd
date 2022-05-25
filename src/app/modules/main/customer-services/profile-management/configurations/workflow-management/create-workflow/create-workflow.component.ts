import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCheckersWorkflowModel } from 'src/app/core/domain/add-checkers-workflow.model';
import { AddUsersWorkflowModel } from 'src/app/core/domain/add-users-workflow.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { SequentialApprovalService } from 'src/app/core/services/sequential-approval/sequential-approval.service';

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

  id: number;
  mode: any;

  @ViewChild(MatSort)
  private sort: MatSort;

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
    private readonly sequentialApprovalService: SequentialApprovalService
  ) { 
    this.id = route.snapshot.params['id'];
    this.mode = route.snapshot.params['mode'];
  }

  ngOnInit(): void {
    this.initForm();
    this.addCheckersWorkflow();
    this.addUsersWorkflow();
  }

  
  ngAfterViewInit(): void {
    this.usersDataSource.sort = this.sort;
    this.checkersDataSource.sort = this.sort;
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
      const data: AddCheckersWorkflowModel[] = Array(3).fill(0).map((x,i) => ({
          name: 'George Okonjo',
          id: '23546987',
          profiletype: 'Individual',
          status: 'Active',
          lastviewed: '12/02/21'
      }));
    
      this.checkersDataSource.data = data;
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

}
