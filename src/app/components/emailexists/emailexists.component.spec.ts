import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailexistsComponent } from './emailexists.component';

describe('EmailexistsComponent', () => {
  let component: EmailexistsComponent;
  let fixture: ComponentFixture<EmailexistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailexistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailexistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
