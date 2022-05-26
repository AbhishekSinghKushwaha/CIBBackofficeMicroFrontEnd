import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/utils/storage.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  panelOpenState = {
    userDetails: true,
    roles: true,
    products: true
  };

  roles: any = [];
  products: any = [];
  accounts: any = [];
  constructor(
    private router: Router, 
    private storageService: StorageService,
    protected location: Location,) {}

   currentRoute = this.location.path();
  
  ngOnInit(): void {
    this.roles = this.storageService.getData('onboarding-roles');
    this.products = this.storageService.getData('products-and-services');
    this.accounts = this.storageService.getData('user-accounts');
    console.log(this.accounts);
    console.log(this.currentRoute)
  }

  saveAndContinue() {
    if(this.currentRoute.includes('corporate-onboarding')){
      this.router.navigate([
        '/customer-services/corporate-onboarding/add-workflow'
      ]);
    }
    else if(this.currentRoute.includes('corporate-360')){
      this.router.navigate([
        '/customer-services/corporate-360'
      ])
    }
    // this.router.navigate([
    //   '/customer-services/corporate-onboarding/add-workflow'
    // ]);
  }
}
