import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { RealComponent } from './real.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
 
describe('RealComponent', () => {
  let component: RealComponent;
  let fixture: ComponentFixture<RealComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      declarations: [ RealComponent ]
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(RealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should be 1 title', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css("title"));
    expect(divcount.length).toBe(1);
  });
 
  it('should be 1 title', () => {
    const divcount = fixture.debugElement
      .query(By.css("title"));
    expect(divcount.nativeElement.textContent).toBe("Real Time Analysis");
  });

});
