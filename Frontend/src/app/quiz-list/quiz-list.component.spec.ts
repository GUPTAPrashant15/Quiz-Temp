import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { QuizListComponent } from './quiz-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { RouterTestingModule } from '@angular/router/testing';
describe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;
  let router : Router;
  let quiz : any ;
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        Ng2SearchPipeModule,
        RouterTestingModule.withRoutes([]),

      ],
      declarations: [ QuizListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
  });

  it('should navigate realTimeAnalysis()', ()=>{
      const component = fixture.componentInstance;
      const navigateSpy = spyOn(router, 'navigate');

      component.realTimeAnalysis(quiz);
     // expect(navigateSpy).toHaveBeenCalledWith(['/realtimeanalysis/id']);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate share()', ()=>{
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.share(quiz);
    expect(navigateSpy).toHaveBeenCalledWith(['/share/id']);
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have statusQuiz() function', () => {
  //   expect(component.statusQuiz(quiz)).toBeTruthy();
  // });

  it('should have exportToCsv() function', () => {
    expect(component.exportToCsv(quiz)).toBeTruthy();
  });


  it('should be 3 div', ()=>{
    const divcount = fixture.debugElement
    .queryAll(By.css('div'));
    expect(divcount.length).toBe(2); 
    });

    it('should be 1 table ', ()=>{
      const divcount = fixture.debugElement
      .queryAll(By.css('table'));
      expect(divcount.length).toBe(1); 
      }); 
     
});
