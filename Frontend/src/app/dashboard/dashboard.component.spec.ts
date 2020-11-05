import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [        
        RouterModule.forRoot([]),
        HttpClientTestingModule,
    ],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
   it('should be 1 mat-card', ()=>{
    const divcount = fixture.debugElement
    .queryAll(By.css('mat-card'));
    expect(divcount.length).toBe(1); 
    });

    it('should be 2 button', ()=>{
      const divcount = fixture.debugElement
      .queryAll(By.css('button'));
      expect(divcount.length).toBe(2); 
      });
      
      it('should have create-quiz.png in "Create Quiz Button"', () => {
        const btn = fixture.debugElement.nativeElement.querySelector('#c1');
        expect(btn.innerHTML).toBe('<img src="assets/image/create-quiz.png" width="130" height="135">');
      });

      it('should have Created-quiz.png in "Created Quiz Button "', () => {
        const btn = fixture.debugElement.nativeElement.querySelector('#c2');
        expect(btn.innerHTML).toBe('<img src="assets/image/created-1.png" width="130" height="130">');
      });
});
