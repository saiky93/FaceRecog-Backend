import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecompanyprofileComponent } from './updatecompanyprofile.component';

describe('UpdatecompanyprofileComponent', () => {
  let component: UpdatecompanyprofileComponent;
  let fixture: ComponentFixture<UpdatecompanyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecompanyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecompanyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
