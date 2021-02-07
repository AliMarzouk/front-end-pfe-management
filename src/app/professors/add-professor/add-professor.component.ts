import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DEPARTMENTS, ProfessorsService} from "../service/professors.service";

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.sass']
})
export class AddProfessorComponent implements OnInit {

  departments = DEPARTMENTS

  fileForm: FormGroup;
  addProfessorForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private professorsService: ProfessorsService) {}

  ngOnInit() {
    this.formInit();
    // this.addProfessorForm.get('registrationNumber')
    // interval(1000).subscribe(value => {
    //   console.log(this.fileForm.get('file'));
    // })
  }

  formInit() {
    this.fileForm = this._formBuilder.group({
      file: ['', Validators.required]
    })
    this.addProfessorForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      department: ['', Validators.required],
      cin: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^\\d{8}$")
      ])]
    })

  }



  addProfessorByForm() {
    console.log(this.addProfessorForm)
  }

  addProfessorsByFile() {
    console.log(this.fileForm)
  }

}
