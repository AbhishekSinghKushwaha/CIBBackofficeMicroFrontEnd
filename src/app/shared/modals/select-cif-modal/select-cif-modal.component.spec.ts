import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCifModalComponent } from './select-cif-modal.component';

describe('SelectCifModalComponent', () => {
  let component: SelectCifModalComponent;
  let fixture: ComponentFixture<SelectCifModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCifModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
