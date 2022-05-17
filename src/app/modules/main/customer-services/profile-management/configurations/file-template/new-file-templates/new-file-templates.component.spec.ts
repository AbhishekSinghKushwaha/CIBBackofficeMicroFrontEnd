import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileTemplatesComponent } from './new-file-templates.component';

describe('NewFileTemplatesComponent', () => {
  let component: NewFileTemplatesComponent;
  let fixture: ComponentFixture<NewFileTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFileTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
