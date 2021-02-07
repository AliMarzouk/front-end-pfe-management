import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.sass']
})
export class AddStudentsComponent implements OnInit {

  fields = [
    'Bio',
    'CH',
    'GL',
    'IIA',
    'IMI',
    'RT'
  ]
  fileForm: FormGroup;
  addStudentForm: FormGroup;
  private id: number;
  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit() {
    this.formInit();
    this.addStudentForm.get('nce')
    // interval(1000).subscribe(value => {
    //   console.log(this.fileForm.get('file'));
    // })
  }

  formInit() {
    this.fileForm = this._formBuilder.group({
      file: ['', Validators.required]
    })
    this.addStudentForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      field: ['', Validators.required],
      cin: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^\\d{8}$")
      ])],
      registrationNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^\\d{7}$")
      ])]
    })

  }
  addStudentByForm() {
    console.log(this.addStudentForm)
  }
  addStudentsByFile() {
    console.log(this.fileForm)
  }
}
