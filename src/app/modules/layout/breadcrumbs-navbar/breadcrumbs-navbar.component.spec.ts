import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsNavbarComponent } from './breadcrumbs-navbar.component';

describe('BreadcrumbsNavbarComponent', () => {
  let component: BreadcrumbsNavbarComponent;
  let fixture: ComponentFixture<BreadcrumbsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
