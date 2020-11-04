import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { QuizListComponent } from './quiz-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
describe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        Ng2SearchPipeModule

      ],
      declarations: [ QuizListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      

      it('should be 1 table ', ()=>{
        const divcount = fixture.debugElement
        .queryAll(By.css('table'));
        expect(divcount.length).toBe(1); 
        }); 
});
