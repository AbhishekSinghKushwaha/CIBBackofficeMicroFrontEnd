import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagementTopNavComponent } from './profile-management-top-nav.component';

describe('ProfileManagementTopNavComponent', () => {
  let component: ProfileManagementTopNavComponent;
  let fixture: ComponentFixture<ProfileManagementTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileManagementTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileManagementTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
