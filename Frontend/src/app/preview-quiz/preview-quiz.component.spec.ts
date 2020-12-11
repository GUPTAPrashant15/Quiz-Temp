import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuizComponent } from './preview-quiz.component';

describe('PreviewQuizComponent', () => {
  let component: PreviewQuizComponent;
  let fixture: ComponentFixture<PreviewQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
