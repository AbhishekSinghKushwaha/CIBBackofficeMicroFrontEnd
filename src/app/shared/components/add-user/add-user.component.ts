import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/utils/storage.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  stage: string;
  subPayLoad = { accounts: {}, products: {}, roles: {} }
  panelOpenState = {
    userDetails: true,
    roles: true,
    products: true
  };
  userId: string;
  username: string;
  roles: any = [];
  products: any = [];
  accounts = [
    {
      "accountName": "JAMES EKAI NATUKOI",
      "accountNumber": "1100194977404",
      "accountType": "",
      "balance": 724779.46,
      "transactionLimit": 10000.0,
      "currency": "KES"
    },
    {
      "accountName": "JERRY MOUSSA",
      "accountNumber": "1200194977404",
      "accountType": "",
      "balance": 424779.46,
      "transactionLimit": 20000.0,
      "currency": "KES"
    }
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private dataLookup: DataLookupService,
    private readonly userService: UserService,
    protected location: Location,
    private readonly fb: FormBuilder,) { }

  currentRoute = this.location.path();

  ngOnInit(): void {
    this.userId = 'userID';
    this.username = 'userID';
    this.initForm();
    this.roles = this.storageService.getData('onboarding-roles')
      .map((role: any) => ({ roleName: role.description, ...role }));
    this.getProductsAndServices();
    this.getAccounts()
  }

  getProductsAndServices() {
    this.dataLookup.getProductsAndServices().subscribe((res) => {
      if (res.isSuccessful) {
        this.products = res.data;
      }
    });
  }

  getAccounts() {
    this.dataLookup.getAccounts('b333cb403a0d475389458029e1b78803').subscribe((res) => {
      console.log(res)
    });
  }

  onSelectedRoles(roles: any) {
    console.log('roles', roles);
    this.subPayLoad.roles =
      roles.reduce((cb: any, p: any) => {
        !cb[p.roleId] && (cb[p.roleId] = []);
        cb[p.roleId].push(p.id);
        return cb;
      }, {})
  }

  onSelectProduct(products: any) {
    console.log('product', products)
    this.subPayLoad.products = { products }
    this.subPayLoad.products =
      products.reduce((cb: any, p: any) => {
        !cb[p.productId] && (cb[p.productId] = []);
        cb[p.productId].push(p.id);
        return cb;
      }, {})
  }

  onSelectAccount(accounts: any) {
    console.log('account', accounts)
    this.subPayLoad.accounts = accounts.map((account: any) => account.accountNumber);
  }

  get getForm() {
    return this.userForm.controls;
  }

  initForm(): void {
    this.userForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      idpp: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      phoneOffice: [null, [Validators.required]],
      cifNumber: [null, [Validators.required]],
      globalCif: [null, [Validators.required]],
      corporateProfile: [null, [Validators.required]],
      currency: [{}, [Validators.required]],
      maxLimit: [null, [Validators.required]],
      dailyLimit: [null, [Validators.required]],
      weeklyLimit: [null, [Validators.required]],
      monthlyLimit: [null, [Validators.required]],
    });
  }

  submitUser() {
    const { currency, maxLimit, dailyLimit, weeklyLimit, monthlyLimit, ...otherProps } = this.userForm.value;
    const payload = {
      ...otherProps,
      userLimit: {
        currency: currency.currencyCode,
        maxLimit,
        dailyLimit,
        weeklyLimit,
        monthlyLimit
      }, ...this.subPayLoad
    };
    // console.log(payload,payload);
    this.userService.saveUsers(payload).subscribe((res) => {
      console.log(res);
      this.router.navigate(['../list'])
    });
  }

  saveAndContinue() {
    if (this.currentRoute.includes('corporate-onboarding')) {
      this.router.navigate([
        '/customer-services/corporate-onboarding/add-workflow'
      ]);
    }
    else if (this.currentRoute.includes('corporate-360')) {
      this.router.navigate([
        '/customer-services/corporate-360'
      ])
    }
    // this.router.navigate([
    //   '/customer-services/corporate-onboarding/add-workflow'
    // ]);
  }
}
