import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Professor} from "../../professors/model/professor.model";
import {ProfessorsService} from "../../professors/service/professors.service";

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.sass']
})
export class AddSessionComponent implements OnInit {

  professors: Professor[] = [];
  addSessionForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private professorService: ProfessorsService) {}
  ngOnInit() {
    this.formInit();
    this.professorService.dataChange.subscribe(value => {
      this.professors = value;
    })
  }

  formInit() {
    this.addSessionForm = this._formBuilder.group({
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      president: ['', Validators.required],
      capacity: ['', Validators.required]
    })

  }
  addSessionByForm() {
    console.log(this.addSessionForm)
  }
}
