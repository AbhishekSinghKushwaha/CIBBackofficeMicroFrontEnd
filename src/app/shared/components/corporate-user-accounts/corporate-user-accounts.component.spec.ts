import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserAccountsComponent } from './corporate-user-accounts.component';

describe('CorporateUserAccountsComponent', () => {
  let component: CorporateUserAccountsComponent;
  let fixture: ComponentFixture<CorporateUserAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUserAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
