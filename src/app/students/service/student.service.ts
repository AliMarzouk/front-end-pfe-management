import {Injectable} from "@angular/core";
import {Student} from "../model/student.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export const Levels = [
  'CYCLE',
  'LICENCE',
  'MASTER'
]

@Injectable()
export class StudentService {
  path: string = environment.API_URL + 'students/';
  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  private dialogData: any;

  get data(): Student[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) {
  }


  getAllStudents() {
    this.http.get<Student[]>(this.path).subscribe(data => {
      console.log(data);
      this.dataChange.next(data)
    })
  }

  getDialogData() {
    return this.dialogData;
  }

  updateStudent(student: Student): void {
    this.dialogData = student;
    this.http.put(this.path + student.id, student).subscribe();
  }

  deleteStudent(student: Student){
    // TODO: add http request
    this.deleteStudentLocally(student);
  }

  deleteStudentLocally(student: Student) {
    const foundIndex = this.dataChange.value.findIndex(
      (x) => x.nce === student.nce
    );
    console.log(foundIndex);
    if (foundIndex > -1) {
      this.dataChange.value.splice(foundIndex, 1);
      this.dataChange.next(this.dataChange.value);
    }
  }
}
