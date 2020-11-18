import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantToQuizComponent } from './add-participant-to-quiz.component';

describe('AddParticipantToQuizComponent', () => {
  let component: AddParticipantToQuizComponent;
  let fixture: ComponentFixture<AddParticipantToQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipantToQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipantToQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
