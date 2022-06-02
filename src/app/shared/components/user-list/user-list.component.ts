import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { UserModel } from 'src/app/core/domain/user.model';
import { PromptModalService } from 'src/app/core/services/prompt-modal/prompt-modal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';
import { confirmModal } from '../../decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  category: string;
  stage: string;
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();
  roles: any[];
  users: UserModel[] = [];
  user: UserModel;
  info: any = {
    approvers: 'Approvers',
    initiators: 'Initiators',
    'super-admin': 'Super admin'
  }
  @ViewChild(MatSort)
  private sort: MatSort;
  completionData: ConfirmationCompletionModel;
  displayedColumns: string[] = [
    'name',
    'date',
    'status',
    'actions',
  ];
  roleMapping: any = {
    initiators: 'Initator',
    'super-admin': 'Approver',
    approvers: 'Super Admin',
  }
  roleId: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly promptModalService: PromptModalService,
    private readonly userService: UserService) {
    this.activatedRoute.params.subscribe(({ category }: any) => {
      if (category) {
        this.category = category;
        this.getRoles();
        console.log(this.category);
      }

    })
  }

  ngOnInit(): void {
    // this.userAdministrationService.getUsers().subscribe((result: any) => {
    //   this.users = result.items.map((element: any) => {
    //     return {
    //       id: element.userId,
    //       idNumber: element.idNumber,
    //       name: `${element.firstName} ${element.lastName}`,
    //       phone: element.phoneNumber,
    //       email: element.email,
    //       status: element.status,
    //       userName: element.userName,
    //       statusName: element.statusName.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')
    //     };
    //   });
    //   this.dataSource.data = this.users;
    // });
  }

  getRoles() {
    this.roles = this.storageService.getData('onboarding-roles');
    console.log('onboarding', this.roles);
    this.getDataList()
  }

  getDataList() {
    this.roleId = this.roles.find(role => role.description === this.roleMapping[this.category]).id
    this.userService.getUsers(this.roleId).subscribe((result: any) => {
      result?.isSuccessful && (this.users = result.data);
      this.dataSource.data = this.users;
    })
  }

  setUserStat(payload: any) {
    this.userService.setUserStat(payload).subscribe((result: any) => {
      this.stage = 'completed';
      this.setCompletionData();
      // result?.isSuccessful && (this.users = result.data);
    })
  }

  setCompletionData() {
    this.completionData = {
      buttonText: 'Go to Overview',
      message: 'Your request has been submitted',
      subMessage: 'We\'ll let you know the status of your request once it has been reviewed. The details of your request are below.',
      icon: 'assets/images/backgrounds/visual-support-icons-virtual-account-submission-avatar.svg',
      content: [{ key: 'Account Number', value: this.user.accountNumber },
      { key: 'CIF', value: this.user.cifNumber },
      { key: 'Account name', value: this.user.name },
      { key: 'Account currency', value: this.user.currency },
      ]
    };
  }

  @confirmModal({
    title: "Do you want to enable this user?",
    message: "Once you enable a user, they will have access to key actions for accounts",
    cancelText: "No",
    confirmText: "Yes",
  })
  enableUser(payload: UserModel) {
    this.user = payload;
    this.setUserStat({ userId: payload.id, status: 'Active', reason: "" });
  }


  confirmationDone(data: any) {
    this.stage = ""
  }

  @confirmModal({
    title: "Do you want to disable this user?",
    message: "Once you disable a user, they will have not access to key actions for accounts",
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  disableUser(payload: UserModel) {
    this.promptModalService
      .open({
        title: 'Why are you disabling this user?',
        required: true,
        inputLabel: 'Reason',
        inputPlaceholder: 'Enter your reason',
        submitButtonText: 'Submit',
        refuseButtonText: 'Cancel',
      })
      .afterClosed()
      .subscribe((reason: any) => {
        if (reason) {
          this.user = payload;
          this.setUserStat({ userId: payload.id, status: 'InActive', reason });
        }
      });
  }

  @confirmModal({
    title: "Delete User",
    message: "Are you sure you want to delete this user",
    cancelText: "Cancel",
    confirmText: "Yes, delete",
  })
  deleteUser(payload: UserModel) {
    this.userService.deleteUser(payload.id).subscribe((result: any) => {
      console.log(result)
      this.getDataList();
      this.stage = "completed";
      this.setCompletionData()
    })
  }

}
