import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    window.history.pushState({ email: 'agarwal.shivam645@gmail.com',password: 'Sopr@_7sopra'},'','/reset-pwd');
    fixture = TestBed.createComponent(ResetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have onCancel() function', () => {
    spyOn(component, 'onCancel');
    expect(component.onCancel).toBeTruthy();
  });
  it('should have onCancel() function', () => {

    expect(component.onCancel).toBeTruthy;
  });
  it('should click Send button with async', async(() => {
    let buttonElement = fixture.debugElement.query(By.css('#send-button'));
      
    spyOn(component, 'onCancel');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);
  
    fixture.whenStable().then(() => {
      expect(component.onCancel).toHaveBeenCalled();
    });
  })); 
});
