import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AnlysisResultComponent } from './anlysis-result.component';

describe('AnlysisResultComponent', () => {
  let component: AnlysisResultComponent;
  let fixture: ComponentFixture<AnlysisResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
