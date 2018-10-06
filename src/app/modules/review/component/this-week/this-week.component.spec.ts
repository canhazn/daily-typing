import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekComponent } from './this-week.component';

describe('ThisWeekComponent', () => {
  let component: ThisWeekComponent;
  let fixture: ComponentFixture<ThisWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
