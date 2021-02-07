import {Injectable} from "@angular/core";
import {Student} from "../model/student.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class StudentService {
  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  private dialogData: any;

  get data(): Student[] {
    return this.dataChange.value;
  }


  getAllStudents() {

    this.dataChange.next([
      new Student('ali',
      'marzouk',
      'ali@insat',
      'GL',
      99999999,
      9999999
      ),
      new Student('bli',
      'marzouk',
      'bli@insat',
      'GL',
      89999999,
      8999999
      )
      ]
    )
  }

  getDialogData() {
    return this.dialogData;
  }

  updateStudent(student: Student): void {
    this.dialogData = student;
    // TODO: Link with backend
  }

  deleteStudent(student: Student){
    // TODO: add http request
    this.deleteStudentLocally(student);
  }

  deleteStudentLocally(student: Student) {
    const foundIndex = this.dataChange.value.findIndex(
      (x) => x.registrationNumber === student.registrationNumber
    );
    console.log(foundIndex);
    if (foundIndex > -1) {
      this.dataChange.value.splice(foundIndex, 1);
      this.dataChange.next(this.dataChange.value);
    }
  }
}
