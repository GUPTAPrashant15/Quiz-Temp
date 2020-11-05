import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {results} from 'src/app/real';
import {Observable} from 'rxjs';

import {RealtimeresultService} from './../realtimeresult.service';


import { RealComponent } from './real.component';
import { RouterModule } from '@angular/router';


describe('RealComponent', () => {
  let component: RealComponent;
  let fixture: ComponentFixture<RealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        HttpClientModule,
         MatDialogModule,
         RouterTestingModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
          ReactiveFormsModule,
      
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
});
