import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNotFoundComponent } from './quiz-not-found.component';

describe('QuizNotFoundComponent', () => {
  let component: QuizNotFoundComponent;
  let fixture: ComponentFixture<QuizNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
