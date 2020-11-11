import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStartPageComponent } from './quiz-start-page.component';

describe('QuizStartPageComponent', () => {
  let component: QuizStartPageComponent;
  let fixture: ComponentFixture<QuizStartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizStartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
