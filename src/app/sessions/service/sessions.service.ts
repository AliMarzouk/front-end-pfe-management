import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {SessionModel} from "../Model/session.model";
import {AcademicYear} from "../../core/models/academic-year.model";

@Injectable()
export class SessionsService {
  path: string = environment.API_URL + 'sessions/'

  constructor(private http: HttpClient) {
  }

  getCurrentYearSessions(): Observable<SessionModel[]>{
    return this.http.get<SessionModel[]>(this.path);
  }



}
