import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileTemplatesComponent } from './list-file-templates.component';

describe('ListFileTemplatesComponent', () => {
  let component: ListFileTemplatesComponent;
  let fixture: ComponentFixture<ListFileTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFileTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFileTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
