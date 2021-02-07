import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {SessionModel} from "../Model/session.model";
import {Student} from "../../students/model/student.model";

@Injectable()
export class SessionsService {
  path: string = environment.API_URL + 'sessions/';
  dataChange: BehaviorSubject<SessionModel[]> = new BehaviorSubject<SessionModel[]>([]);
  private dialogData: any;

  get data(): SessionModel[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) {
  }

  getCurrentYearSessions(): Observable<SessionModel[]>{
    return this.http.get<SessionModel[]>(this.path);
  }

  getAllSessions() {
    this.http.get<SessionModel[]>(this.path).subscribe(data => {
      console.log(data);
      this.dataChange.next(data)
    })
  }

  getDialogData() {
    return this.dialogData;
  }

  updateStudent(session: SessionModel): void {
    this.dialogData = session;
    this.http.put(this.path + session._id, session).subscribe();
  }

  deleteStudent(session: SessionModel){
    // TODO: add http request
    this.deleteStudentLocally(session);
  }

  deleteStudentLocally(session: SessionModel) {
    const foundIndex = this.dataChange.value.findIndex(
      (x) => x._id === session._id
    );
    console.log(foundIndex);
    if (foundIndex > -1) {
      this.dataChange.value.splice(foundIndex, 1);
      this.dataChange.next(this.dataChange.value);
    }
  }
}
