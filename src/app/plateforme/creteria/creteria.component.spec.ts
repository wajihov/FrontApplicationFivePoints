import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteriaComponent } from './creteria.component';

describe('CreteriaComponent', () => {
  let component: CreteriaComponent;
  let fixture: ComponentFixture<CreteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
