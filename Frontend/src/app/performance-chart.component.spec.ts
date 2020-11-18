import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceChartComponent } from './performance-chart.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';


describe('PerformanceChartComponent', () => {
  let component: PerformanceChartComponent;
  let fixture: ComponentFixture<PerformanceChartComponent>;
  let quiz:{questions:[0,1,2]};
  let result:any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      declarations: [ PerformanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call back button',()=>{
    expect(component.backClicked()).toBeTruthy();
  });
   it('should have sampleData(result,quiz) function', () => {
    expect(component.sampleData(result,quiz)).toBeTruthy();
  });
});
