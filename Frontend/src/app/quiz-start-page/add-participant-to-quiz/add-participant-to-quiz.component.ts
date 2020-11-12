import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-participant-to-quiz',
  templateUrl: './add-participant-to-quiz.component.html',
  styleUrls: ['./add-participant-to-quiz.component.css']
})
export class AddParticipantToQuizComponent implements OnInit {

  start = false;

  front = true;
  constructor(
    private fb: FormBuilder) { }
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z]\\w{5,29}$')]]
    })
  }

  get f() {
    return this.form.controls;
  }
  userForm(userInformation) {
    console.log(this.front);
  }

}
