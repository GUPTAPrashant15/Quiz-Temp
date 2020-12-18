import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    window.history.pushState({ quiz: {quizId:'3',quizName:'Math Quiz',description: 'Testing your Ability',
    username:'shivam',createdDate:'12/11/12'},username: 'shivam123',score: '3'},'','/reset-pwd');
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getElementById ', () => {
    var dummyElement = document.createElement('logout');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    fixture.detectChanges();
    expect(document.getElementById).toBeTruthy;
  
  });
});
