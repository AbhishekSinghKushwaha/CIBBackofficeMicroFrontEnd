import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
import { WorkflowManagementService } from 'src/app/core/services/workflow-management/workflow-management.service';
import { CurrencyModel } from "src/app/core/domain/transfer.models";
import { CurrencySelectionService } from "src/app/core/services/modal-services/currency-selection.service";
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';

export type WorkflowStatus = 'active' | 'disabled';

export interface Transaction {
  id: string;
  transactionname: string;
  checked: boolean;
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

  mode: any;

  currency: CurrencyModel = { currencyCode: "", currencyDescription: "" };

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
      id: 'fcb52e03-5ee3-4185-a152-e89571a03281',
      transactionname: 'Internal Fund Transfer',
      checked: false
    },
    {
      id: 'c0d95ed7-746d-4be3-b849-da1aa0524b6f',
      transactionname: 'IntraBank Fund Transfer',
      checked: false
    },
    {
      id: '7173f539-3fd6-4a9c-ad61-c2d14b5d320a',
      transactionname: 'ETF/RTGS Transfer',
      checked: false
    },
    {
      id: 'd8882a95-f0d6-434d-b61c-53e0b0d47e9e',
      transactionname: 'Tax Payment',
      checked: false
    },
    {
      id: 'ba1166d2-d50a-4318-8be4-513eac83f399',
      transactionname: 'International funds transfer',
      checked: false
    },
    {
      id: '163fb31f-c0cd-4082-9844-317152f567c4',
      transactionname: 'Bulk Payment',
      checked: false
    },
    {
      id: '3f468fda-7bad-429d-aec5-936084419227',
      transactionname: 'Salary Payment',
      checked: false
    },
    {
      id: 'ec542f66-968d-4fb2-a6dd-8da6ec82dbb9',
      transactionname: 'Utility Payment',
      checked: false
    },
    {
      id: '1d0a3f00-afaf-4831-852f-b83bb1cbacd3',
      transactionname: 'Card Payment',
      checked: false
    },
    {
      id: 'ce155ea2-7842-4770-b640-62d1779f7eb6',
      transactionname: 'Inter Country Transfers',
      checked: false
    },
    {
      id: 'b54ab332-07b2-4bde-bb01-212eac70d246',
      transactionname: 'Pesalink Transfer',
      checked: false
    },
    {
      id: '1b179be5-0dc3-4f97-aaf4-15ddbc6a6b54',
      transactionname: 'Standing Instruction',
      checked: false
    }
  ]

  approvers: any = [
    {
      number: '1',
    },
    {
      number: '2',
    },
    {
      number: '3',
    }
  ];

  fxIdList: any = [
    {
      id: '6703a03b-64bd-4e39-b8a7-1277e5698ba1',
      name: 'Cancel when expired',
      checked: false
    },
    {
      id: '9e430a66-d580-431c-9f82-9db538395d08',
      name: 'Apply normal rate when expired',
      checked: false
    }
  ]

  approvalSequence: any = [
    {
      id: '137189d1-ff21-46fa-9892-d533f6fb68ac',
      name: 'Parallel',
      checked: false
    },
    {
      id: '34901025-4b00-4af2-b3a0-6bd94fb89c33',
      name: 'Sequential',
      checked: false
    }
  ]

  accountsToAccess: any = [
    {
      accountId: "2466a103-2a08-412d-aadc-e6408b81dbc9",
      accountName: "Account 1"
    },
    {
      accountId: "d68eaae4-2f90-4010-a781-db26cebbfa90",
      accountName: "Account 2"
    },
    {
      accountId: "4941aaf0-5149-4eea-a0f0-65923c2600db",
      accountName: "Account 3"
    }
  ]

  companyList: any = [
    {
      id: "16bdac12-7117-4c43-9389-851e9d039086",
      name: "Test Company"
    }
  ]

  usersSelection = new SelectionModel<AddUsersWorkflowModel>(true, []);
  checkersSelection = new SelectionModel<AddCheckersWorkflowModel>(true, []);

  sequenceCheckerIdList: any;
  usersCheckerIdList: any = [];
  checkersCheckerIdList: any = [];
  productsAccessList: any = [];
  fxReferenceId: any;
  approvalSequenceId: any;
  approvalSequenceName: any;
  getWorkflowIdData: any;
  getWorkflowIdDetails: any;
  
  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sequentialApprovalService: SequentialApprovalService,
    private readonly router: Router,
    private readonly biometricVerificationService: BiometricVerificationService,
    private readonly workflowManagementService: WorkflowManagementService,
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly confirmationService: ConfirmationService,
  ) { 
    this.mode = route.snapshot.params['mode'];
  }

  get getForm() {
    return this.createWorkflowMangementForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.addCheckersWorkflow();
    this.addUsersWorkflow();
    this.getWorkflowId();

    if(this.getWorkflowIdData?.companyId){
      this.getWorkFlowById();
    }
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
      productAccess: new FormArray([]),
      fxReference: ['', [Validators.required]],
      approvalSequence: ['', [Validators.required]],
      usersList: new FormArray([]),
      checkersList: new FormArray([])
    });
  }

  getWorkflowId() {
    this.workflowManagementService.currentData.subscribe(data => {
      this.getWorkflowIdData = data;
    });
  }

  getWorkFlowById() {
    this.workflowManagementService.
    getWorkflowId(this.getWorkflowIdData?.companyId, this.getWorkflowIdData?.workflowSettingsId).
    subscribe((res: any) => {
      if(res.isSuccessful){
        this.getWorkflowIdDetails = res.data;
        this.createWorkflowMangementForm.patchValue({
          workflowname: res.data.name,
          workflowdescription: res.data.description,
          currency: res.data.currency,
          minimumamount: res.data.minAmount,
          maximumamount: res.data.maxAmount,
          accountsaccess: res.data.accountsToAccess,
        });
        this.setCompanyName(this.getWorkflowIdDetails.companyId);
        this.setCurrency();
        this.setApprovers(this.getWorkflowIdDetails.approversNumber);
        this.setAccountsAccess(this.getWorkflowIdDetails.accountsToAccess[0].accountId);
        this.setProducts();
        this.setFxReferenceId();
        this.setApprovalSequence();
        this.setCheckers();
        this.setUsers();
      }
    });
  }

  setCompanyName(companyId: any) {
    
    switch(companyId) {
      case "16bdac12-7117-4c43-9389-851e9d039086":
        this.createWorkflowMangementForm.controls.companyname.setValue(this.companyList[0]);
        break;
      default:
      break;       
    }
  }

  setCurrency() {
    this.currency.currencyCode = this.getWorkflowIdDetails.currency;
    this.currencySelectionService.select(this.currency);
  }

  setApprovers(count: any) {
    switch(count) {
      case 1:
        this.createWorkflowMangementForm.controls.approvers.setValue(this.approvers[0]);
        break;
      case 2:
        this.createWorkflowMangementForm.controls.approvers.setValue(this.approvers[1]);
        break;
      case 3:
        this.createWorkflowMangementForm.controls.approvers.setValue(this.approvers[2]);
        break;
      default:
        break;      
    }
  }

  setAccountsAccess(account: any) {
    switch(account) {
      case "2466a103-2a08-412d-aadc-e6408b81dbc9":
        this.createWorkflowMangementForm.controls.accountsaccess.setValue(this.accountsToAccess[0]);
        break;
      case "d68eaae4-2f90-4010-a781-db26cebbfa90":
        this.createWorkflowMangementForm.controls.accountsaccess.setValue(this.accountsToAccess[1]);
        break;
      case "4941aaf0-5149-4eea-a0f0-65923c2600db":
        this.createWorkflowMangementForm.controls.accountsaccess.setValue(this.accountsToAccess[2]);
        break;
      default:
      break;       
    }
  }

  setProducts() {
    const formArray: FormArray = this.createWorkflowMangementForm.get('productAccess') as FormArray;

    this.getWorkflowIdDetails.productsToAccess.map((data: any) => {
      this.transactions.map((transaction: any) => {
        if(data.productId === transaction.id) {
          transaction.checked = true;
          formArray.push(new FormControl(data));
        }
      });
    })
  }

  setFxReferenceId() {
    this.fxIdList.map((data: any) => {
      if(data.id === this.getWorkflowIdDetails.fxReferenceId) {
        data.checked = true;
        this.createWorkflowMangementForm.controls.fxReference.setValue(data.id);
      }
    })
  }

  setApprovalSequence() {
    this.approvalSequence.map((data: any) => {
      if(data.name === this.getWorkflowIdDetails.approvalSequence.aprovalSequenceType) {
        data.checked = true;
        this.createWorkflowMangementForm.controls.approvalSequence.setValue(data.name);
      }
    });
  }

  setCheckers() {
    const formCheckersArray: FormArray = this.createWorkflowMangementForm.get('checkersList') as FormArray;

    this.getWorkflowIdDetails.workflowCheckers.map((data: any) => {
      this.checkersDataSource.data.map((checker: any) => {
        if(data.checkerId === checker.id) {
          checker.checked = true;
          formCheckersArray.push(new FormControl(data));
        }
      })
    });
  }

  setUsers() {
    const formUsersArray: FormArray = this.createWorkflowMangementForm.get('usersList') as FormArray;

    this.getWorkflowIdDetails.workflowUsers.map((data: any) => {
      this.usersDataSource.data.map((user: any) => {
        if(data.userId === user.id) {
          user.checked = true;
          formUsersArray.push(new FormControl(data));
        }
      })
    });
  }

  addUsersWorkflow() {
    this.usersDataSource = new MatTableDataSource();
      const data: AddUsersWorkflowModel[] = [
        {
          name: 'George Okonjo',
          id: 'c1b5f19f-cf7b-4e1d-99bc-b7c7da365872',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20',
          checked: false
        },
        {
          name: 'George',
          id: 'b9447e11-0340-487b-aabd-9c65f87bdaac',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20',
          checked: false
        },
        {
          name: 'Okonjo',
          id: 'e7d20293-6782-4ffd-bd3f-3486c9fa609d',
          role: 'Approver',
          status: 'Active',
          lastviewed: '12/02/20',
          checked: false
        }
      ];
    
      this.usersDataSource.data = data;
  }

  addCheckersWorkflow() {
    this.checkersDataSource = new MatTableDataSource();
      const data: AddCheckersWorkflowModel[] = [
        {
          name: 'George Okonjo',
          id: '38332970-ff88-46e1-9673-641b420b10ed',
          profiletype: 'Individual',
          status: 'Active',
          lastviewed: '12/02/21',
          checked: false
        },
        {
          name: 'Okonjo',
          id: '46dca1af-2394-45d5-923a-07321a7e6c3d',
          profiletype: 'Individual',
          status: 'Active',
          lastviewed: '12/02/21',
          checked: false
        },
        {
          name: 'George',
          id: 'd7fca3e1-2f94-47ec-892c-c50d05a87944',
          profiletype: 'Individual',
          status: 'Active',
          lastviewed: '12/02/21',
          checked: false
        }
      ];
    
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

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.usersDataSource.filter = filterValue;
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

  usersCheckedList(event: any,index: number, row: any) {
    const formUsersArray: FormArray = this.createWorkflowMangementForm.get('usersList') as FormArray;

    if(event.checked){
      const usersPayload = {
        userId: this.usersDataSource.data[index].id,
        userName: this.usersDataSource.data[index].name,
      }
      this.usersSelection.toggle(row);
      this.usersCheckerIdList.push(usersPayload);
      formUsersArray.push(new FormControl(usersPayload));
    }
    else {
      const i = formUsersArray.controls.findIndex(x => x.value === event.source.value);
      formUsersArray.removeAt(i);
    }
  }

  checkersCheckedList(event: any,index: number, row: any) {
    const formCheckersArray: FormArray = this.createWorkflowMangementForm.get('checkersList') as FormArray;

    if(event.checked){
      const checkersPayload = {
        checkerId: this.checkersDataSource.data[index].id,
        checkerName: this.checkersDataSource.data[index].name,
      }
      this.checkersSelection.toggle(row);
      this.checkersCheckerIdList.push(checkersPayload);
      formCheckersArray.push(new FormControl(checkersPayload));
    }
    else {
      const i = formCheckersArray.controls.findIndex(x => x.value === event.source.value);
      formCheckersArray.removeAt(i);
    }
  }

  productsAccess(event: any,index: number) {

    const formArray: FormArray = this.createWorkflowMangementForm.get('productAccess') as FormArray;

    if(event.checked){
      const checkersPayload = {
        productId: this.transactions[index].id,
        productName: this.transactions[index].transactionname,
      }
      this.productsAccessList.push(checkersPayload);
      formArray.push(new FormControl(checkersPayload));

    }
    else {
      const i = formArray.controls.findIndex(x => x.value === event.source.value);
      formArray.removeAt(i);
    }
  }

  selectFxId(event: any,index: number) {
    if(event.checked){
      this.fxReferenceId = this.fxIdList[index].id;
      this.createWorkflowMangementForm.controls.fxReference.setValue(this.fxReferenceId);
    }
  }

  selectApprovalSequence(event: any,index: number) {
    if(event.checked){
      this.approvalSequenceName = this.approvalSequence[index].name;
      this.createWorkflowMangementForm.controls.approvalSequence.setValue(this.approvalSequenceName);
    }
    if(this.approvalSequenceName === 'Sequential'){
      this.openSequentialApproval();
    }
    else {
      console.log('Parallel');
    }
  }

  quit() {
    this.router.navigate(['/customer-services/corporate-360/configurations/workflow-management']);
  }

  back() {
    this.router.navigate(['/customer-services/corporate-360/configurations/workflow-management']);
  }

  createWorkFlow() {
    this.sequentialApprovalService.currentData.subscribe((data) => {
      this.sequenceCheckerIdList = data;
    });

    const payload = {
      corporateId: "2bacf557-4b60-4e94-b300-ebfb6deaa4a8",
      companyId: this.getForm.companyname.value.id,
      name:this.getForm.workflowname.value,
      description:this.getForm.workflowdescription.value,
      approversNumber: Number(this.getForm.approvers.value.number),
      currency: this.getForm.currency.value.currencyCode,
      minAmount: Number(this.getForm.minimumamount.value),
      maxAmount: Number(this.getForm.maximumamount.value),
      accountsToAccess: [this.getForm.accountsaccess.value],
      productsToAccess: this.productsAccessList,
      fxReferenceId: this.fxReferenceId,
      approvalSequence: {
        aprovalSequenceType: this.approvalSequenceName,
        orderedCheckerIdList: this.sequenceCheckerIdList,
      },
      workflowUsers: this.usersCheckerIdList,
      workflowCheckers: this.checkersCheckerIdList,
      status: "Active"
    }

    const confirmationPayload = {
      type: 'workflow',
      accountName: this.getForm.accountsaccess.value.accountName,
      accountNumber: this.getForm.accountsaccess.value.accountId,
      currency: this.getForm.currency.value.currencyCode,
      cif: "123456789",
    }
    
    this.confirmationService.confirmationDetails(confirmationPayload);

    this.workflowManagementService.createWorkflow(payload, payload.companyId).subscribe((res: any) => {
      if(res.isSuccessful) {
        this.biometricVerificationService.open();
      }
    });
  }

  updateWorkFlow() {
    this.sequentialApprovalService.currentData.subscribe((data) => {
      this.sequenceCheckerIdList = data;
    });
    
    const updatePayload = {
      corporateId: this.getWorkflowIdDetails.corporateId,
      workflowSetttingsId: this.getWorkflowIdData?.workflowSettingsId,
      companyId: this.getForm.companyname.value.id,
      name:this.getForm.workflowname.value,
      description:this.getForm.workflowdescription.value,
      approversNumber: Number(this.getForm.approvers.value.number),
      currency: this.getForm.currency.value.currencyCode,
      minAmount: Number(this.getForm.minimumamount.value),
      maxAmount: Number(this.getForm.maximumamount.value),
      accountsToAccess: [this.getForm.accountsaccess.value],
      productsToAccess: this.getForm.productAccess.value,
      fxReferenceId: this.getForm.fxReference.value,
      approvalSequence: {
        aprovalSequenceType: this.getForm.approvalSequence.value,
        orderedCheckerIdList: this.sequenceCheckerIdList,
      },
      workflowUsers: this.getForm.usersList.value,
      workflowCheckers: this.getForm.checkersList.value,
      status: this.getWorkflowIdDetails.status
    }

    const confirmationPayload = {
      type: 'workflow',
      accountName: this.getForm.accountsaccess.value.accountName,
      accountNumber: "1100194977404",
      currency: this.getForm.currency.value.currencyCode,
      cif: "123456789",
    }
    
    this.confirmationService.confirmationDetails(confirmationPayload);

    this.workflowManagementService.updateWorkflow(updatePayload, updatePayload.companyId).subscribe((res: any) => {
      if(res.isSuccessful) {
        this.biometricVerificationService.open();
      }
    });
  }

}
