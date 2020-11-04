import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQuizComponent } from './register-quiz.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('RegisterQuizComponent', () => {
  let component: RegisterQuizComponent;
  let fixture: ComponentFixture<RegisterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        FormsModule

      ],
      declarations: [ RegisterQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
