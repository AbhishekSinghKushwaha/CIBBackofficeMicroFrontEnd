import { Component, OnInit } from '@angular/core';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private readonly dataLookup: DataLookupService,
    private readonly storageService: StorageService,) {
    this.getRoles();
    // this.getAccounts();
    // this.getUserAccounts();
  }

  ngOnInit(): void {
  }

  // Get roles
  getRoles() {
    this.dataLookup.getRoles().subscribe(res => {
      if (res.isSuccessful) {
        this.storageService.setData('onboarding-roles', res.data);
      }
    });
  }

  getUserAccounts() {
    this.dataLookup.getUserAccounts().subscribe(res => {
      if (res.status) {
        this.storageService.setData('user-accounts', res.data);
      }
    });
  }

  // getAccounts() {
  //   this.dataLookup.getAccounts('94e0418a6b6d4f999ddba7140f9b5622').subscribe(res => {
  //     console.log(res)
  //     // this.storageService.setData('onboarding-roles', res.data);
  //   });
  // }

}
