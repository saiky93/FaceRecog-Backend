import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakepicturesComponent } from './takepictures.component';

describe('TakepicturesComponent', () => {
  let component: TakepicturesComponent;
  let fixture: ComponentFixture<TakepicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakepicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakepicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
