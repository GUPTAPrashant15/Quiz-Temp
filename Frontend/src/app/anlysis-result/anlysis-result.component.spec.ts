import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AnlysisResultComponent } from './anlysis-result.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';

import { RouterModule } from '@angular/router';


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
});
