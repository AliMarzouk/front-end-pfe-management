import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Professor} from "../model/professor.model";

export const DEPARTMENTS = [
  'Génie Physique et Instrumentation',
  'Génie Informatique et Mathématiques',
  'Génie Biologique et de Chimie',
  'Sciences Sociales, Langues et Formation Générale'
]

@Injectable()
export class ProfessorsService {

  dataChange: BehaviorSubject<Professor[]> = new BehaviorSubject<Professor[]>([]);

  private dialogData: any;
  get data(): Professor[] {
    return this.dataChange.value;
  }

  getAllProfessors() {

    this.dataChange.next([
        new Professor('ali',
          'marzouk',
          'bli@insat',
          DEPARTMENTS[1],
          89999999
        ),
        new Professor('mohsen',
          'khaled',
          'ahla@bik',
          DEPARTMENTS[2],
          66666666
        )
      ]
    )
  }


  updateProfessor(value: any) {
    this.dialogData = value;
    // TODO link with backend
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
