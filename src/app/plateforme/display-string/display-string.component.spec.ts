import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStringComponent } from './display-string.component';

describe('DisplayStringComponent', () => {
  let component: DisplayStringComponent;
  let fixture: ComponentFixture<DisplayStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
