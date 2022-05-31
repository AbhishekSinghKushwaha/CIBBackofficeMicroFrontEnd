import { Location } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserProduct, UserSubProduct } from 'src/app/core/domain/user.model';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { ProductsAndServicesService } from 'src/app/core/services/products-and-services/products-and-services.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-corporate-user-products',
  templateUrl: './corporate-user-products.component.html',
  styleUrls: ['./corporate-user-products.component.scss']
})
export class CorporateUserProductsComponent implements OnInit {
  activeProducts: any[];
  @Output() selectedProducts = new Subject();
  @Input() username: any;
  private _products: any[];
  loadedProducts: string[];
  @Input() set products(input: any[]) {
    this._products = input;
    this.setAlreadySelectedProducts(input);
    console.log(this._products)
  };
  get products(): any[] {
    return this._products || [];
  }

  constructor(
    private readonly router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activeProducts = [];
  }

  ngOnInit(): void {
  }

  setAlreadySelectedProducts(allProducts: any[]) {
    if (allProducts) {
      const oldActiveProducts = this.storageService.getData("selected-products");
      this.activeProducts = [];
      for (const item of allProducts) {
        item?.productServices.forEach((perm: any) => {
          if (oldActiveProducts?.map((x: any) => x.id).indexOf(perm.id) > -1) {
            this.activeProducts.push({ ...perm, productName: item.productName, productId: item.id });
          }
        })
      }
    }

  }

  toggle(productId: any, subProductId: any): void {
    const product = this.products.find((product) => product.id === productId);
    const service = product?.productServices.find((sub: any) => sub.id === subProductId);
    const selectedPermissionIndex = this.activeProducts?.findIndex(
      (sub: any) => sub.id === subProductId
    );
    console.log(service,selectedPermissionIndex)
    if (selectedPermissionIndex > -1) {
      this.activeProducts.splice(selectedPermissionIndex, 1);
    } else {
      this.activeProducts.push({ productName: product?.productName, productId: product?.id, ...service });
    }
    this.selectedProducts.next(this.activeProducts);
  }

  isParentProductActive(productId: any): boolean {
    return true;
  }

  mainProductChange(event: any) {
    if (event.value) {
      this.activeProducts = this.activeProducts.filter(x => x.productName === event.value);
      this.selectedProducts.next(this.activeProducts);
    }
  }

  isProductActive(productId: any, subProductId: any): boolean {
    return this.activeProducts.some(
      (permission: any) => {
        return permission.id === subProductId;
      }
    );
  }
}
