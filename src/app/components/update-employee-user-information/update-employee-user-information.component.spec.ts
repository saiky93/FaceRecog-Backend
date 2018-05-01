import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeUserInformationComponent } from './update-employee-user-information.component';

describe('UpdateEmployeeUserInformationComponent', () => {
  let component: UpdateEmployeeUserInformationComponent;
  let fixture: ComponentFixture<UpdateEmployeeUserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeUserInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
