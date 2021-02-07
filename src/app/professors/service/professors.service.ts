import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Professor} from "../model/professor.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export const DEPARTMENTS = [
  'Génie Physique et Instrumentation',
  'Génie Informatique et Mathématiques',
  'Génie Biologique et de Chimie',
  'Sciences Sociales, Langues et Formation Générale'
]

@Injectable()
export class ProfessorsService {

  path: string = environment.API_URL+'professors/'

  dataChange: BehaviorSubject<Professor[]> = new BehaviorSubject<Professor[]>([]);

  private dialogData: any;
  get data(): Professor[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) {
    this.dataChange.subscribe(value => {
      console.log(value);
    })
  }

  getAllProfessors() {
    return this.http.get(this.path).subscribe(value => {
      console.log(value);
      this.dataChange.next([value['content']]);
    });
  }


  updateProfessor(prof: Professor) {
    return this.http.put(this.path + prof.cin,prof)
  }

  getDialogData() {
    return this.dialogData;
  }

  deleteProfessor(professor: Professor){
    // TODO: add http request
    this.deleteProfessorLocally(professor);
  }

  deleteProfessorLocally(professor: Professor) {
    const foundIndex = this.dataChange.value.findIndex(
      (x) => x.cin === professor.cin
    );
    if (foundIndex > -1) {
      this.dataChange.value.splice(foundIndex, 1);
      this.dataChange.next(this.dataChange.value);
    }
  }
}
