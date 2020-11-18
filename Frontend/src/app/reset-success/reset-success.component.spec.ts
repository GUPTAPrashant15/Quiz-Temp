import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetSuccessComponent } from './reset-success.component';

describe('ResetSuccessComponent', () => {
  let component: ResetSuccessComponent;
  let fixture: ComponentFixture<ResetSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetSuccessComponent ],
      imports:[
                RouterTestingModule,
                HttpClientTestingModule,
              ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
