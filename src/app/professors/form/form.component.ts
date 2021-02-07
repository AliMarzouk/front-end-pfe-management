import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Professor} from "../model/professor.model";
import {DEPARTMENTS, ProfessorsService} from "../service/professors.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  action: string;
  dialogTitle: string;
  isDetails = false;
  professorForm: FormGroup;
  professor: Professor;
  departments = DEPARTMENTS
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public professorsService: ProfessorsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.professor.name;
      this.professor = data.professor;
      this.professorForm = this.createProfessorForm();
    } else if (this.action === 'details') {
      this.professor = data.professor;
      this.isDetails = true;
    }
    else {
      this.isDetails = false;
      this.dialogTitle = 'New Professor';
      this.professor = new Professor();
      this.professorForm = this.createProfessorForm();
    }

  }

  getErrorMessage(value: string): string {
    return this.professorForm.get(value).hasError('required')
      ? 'Ce champs est obligatoire'
      : (this.professorForm.get(value).hasError('email')
        ? 'Email non valide'
        : (this.professorForm.get(value).hasError('pattern')
          ? 'Veuillez introduire une valeur valide'
          : ''));
  }

  createProfessorForm(): FormGroup {
    return this.fb.group({
      firstName: [this.professor.firstName, Validators.required],
      lastName: [this.professor.lastName, Validators.required],
      email: [this.professor.email, Validators.compose([Validators.required,Validators.email])],
      department: [this.professor.department, Validators.required],
      cin: [this.professor.cin, Validators.compose([
        Validators.required,
        Validators.pattern("^\\d{8}$")
      ])]
    });
  }
  submit() {
    this.professorsService.updateProfessor(this.professorForm.value);
    console.log(this.professorForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  confirmAdd() {

  }
}

