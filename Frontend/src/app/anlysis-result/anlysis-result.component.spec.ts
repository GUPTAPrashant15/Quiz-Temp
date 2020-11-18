import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AnlysisResultComponent } from './anlysis-result.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('AnlysisResultComponent', () => {
  let component: AnlysisResultComponent;
  let fixture: ComponentFixture<AnlysisResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        FormsModule

      ],
      declarations: [ AnlysisResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnlysisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be 4 Div', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('Div'));
    expect(divcount.length).toBe(4);
  });

  it('should be 2 button', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('button'));
    expect(divcount.length).toBe(2);
  });

  it('should be 2 select', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('select'));
    expect(divcount.length).toBe(2);
  });

  it('should be 2 label', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('label'));
    expect(divcount.length).toBe(2);
  });

  it('should be 1 h1 tag', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('h1'));
    expect(divcount.length).toBe(1);
  });
  

  it('should be SaveValue function:pie ', () => {
     
    expect(component.saveValue({chartType: "2", Ques: "1"})).toBeTruthy();
  });

  it('should be SaveValue function:column ', () => {
     
    expect(component.saveValue({chartType: "1", Ques: "1"})).toBeTruthy();
  });
  it('should call back button',()=>{
    expect(component.backClicked()).toBeTruthy();
  });
});
