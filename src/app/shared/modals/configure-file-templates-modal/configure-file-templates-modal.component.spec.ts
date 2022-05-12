import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureFileTemplatesModalComponent } from './configure-file-templates-modal.component';

describe('ConfigureFileTemplatesModalComponent', () => {
  let component: ConfigureFileTemplatesModalComponent;
  let fixture: ComponentFixture<ConfigureFileTemplatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureFileTemplatesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureFileTemplatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
