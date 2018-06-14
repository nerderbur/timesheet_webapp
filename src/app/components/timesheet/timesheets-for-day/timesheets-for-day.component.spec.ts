import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsForDayComponent } from './timesheets-for-day.component';

describe('TimesheetsForDayComponent', () => {
  let component: TimesheetsForDayComponent;
  let fixture: ComponentFixture<TimesheetsForDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetsForDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetsForDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
