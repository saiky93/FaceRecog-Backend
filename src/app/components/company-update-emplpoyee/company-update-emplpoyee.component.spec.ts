import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpdateEmplpoyeeComponent } from './company-update-emplpoyee.component';

describe('CompanyUpdateEmplpoyeeComponent', () => {
  let component: CompanyUpdateEmplpoyeeComponent;
  let fixture: ComponentFixture<CompanyUpdateEmplpoyeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUpdateEmplpoyeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUpdateEmplpoyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
