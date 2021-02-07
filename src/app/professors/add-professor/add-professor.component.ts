import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DEPARTMENTS, ProfessorsService} from "../service/professors.service";
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";

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
              private http: HttpClient,
              private professorsService: ProfessorsService) {}

  ngOnInit() {
    this.formInit();
    // this.addProfessorForm.get('nce')
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
  }

  addProfessorsByFile() {
    console.log(this.fileForm.value['file']['files'][0]);
    const headers = new HttpHeaders({
      'access-control-allow-origin': '*',
      'Content-Type': 'application/octet-stream'
    });
    let formData = new FormData();
    formData.append('upload', this.fileForm.value['file']['files'][0]);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      headers: headers
    };

    let blob = new Blob([this.fileForm.value['file']['files'][0]], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    console.log(blob)

    const req = new HttpRequest('POST', 'http://localhost:3000/auth/ali', blob, options);
    return this.http.request(req).subscribe();
    // this.http.post('http://localhost:3000/auth/ali',this.fileForm.value,{
    //   headers: headers
    // }).subscribe(value => {
    //   console.log(value);
    // });
  }

}
