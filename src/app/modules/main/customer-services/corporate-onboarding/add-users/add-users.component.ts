import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  panelOpenState = {
    userDetails: true,
    roles: true,
    products: true
  };

  roles: any = [];
  products: any = [];
  accounts: any = [];
  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    // this.roles = this.storageService.getData('onboarding-roles');
    // this.products = this.storageService.getData('products-and-services');
    // this.accounts = this.storageService.getData('user-accounts');
    // console.log(this.accounts,);
  }

  // saveAndContinue() {
  //   this.router.navigate([
  //     '/customer-services/corporate-onboarding/add-workflow'
  //   ]);
  // }
}
