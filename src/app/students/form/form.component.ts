import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../model/student.model";
import {StudentService} from "../service/student.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  isDetails = false;
  studentForm: FormGroup;
  student: Student;
  fields = [
    'Bio',
    'CH',
    'GL',
    'IIA',
    'IMI',
    'RT'
  ]
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentService: StudentService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.student.name;
      this.student = data.student;
      this.studentForm = this.createStudentForm();
    } else if (this.action === 'details') {
      this.student = data.student;
      this.isDetails = true;
    }
    else {
      this.isDetails = false;
      this.dialogTitle = 'New Contacts';
      this.student = new Student();
      this.studentForm = this.createStudentForm();
    }

  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createStudentForm(): FormGroup {
    return this.fb.group({
      firstName: [this.student.firstName, Validators.required],
      lastName: [this.student.lastName, Validators.required],
      email: [this.student.email, Validators.compose([Validators.required,Validators.email])],
      field: [this.student.field, Validators.required],
      cin: [this.student.cin, Validators.compose([
        Validators.required,
        Validators.pattern("^\\d{8}$")
      ])],
      registrationNumber: [this.student.registrationNumber, Validators.compose([
        Validators.required,
        Validators.pattern("^\\d{7}$")
      ])]
    });
  }
  submit() {
    this.studentService.updateStudent(this.studentForm.value);
    console.log(this.studentForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.studentForm);
  }
}
