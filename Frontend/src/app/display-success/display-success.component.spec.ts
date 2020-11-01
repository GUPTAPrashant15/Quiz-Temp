import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySuccessComponent } from './display-success.component';

describe('DisplaySuccessComponent', () => {
  let component: DisplaySuccessComponent;
  let fixture: ComponentFixture<DisplaySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
