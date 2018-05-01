import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeInformationComponent } from './update-employee-information.component';

describe('UpdateEmployeeInformationComponent', () => {
  let component: UpdateEmployeeInformationComponent;
  let fixture: ComponentFixture<UpdateEmployeeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
