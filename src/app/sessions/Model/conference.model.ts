import {Professor} from "../../professors/model/professor.model";
import {Project} from "./project.model";
import {SessionModel} from "./session.model";

export class Conference {
  date: Date;
  room: string;
  session: SessionModel;
  president: Professor;
  inspector: Professor;
  supervisor: Professor;
  enterpriseSupervisor: string;
  project: Project;
}
