import {Student} from "../../students/model/student.model";
import {Professor} from "../../professors/model/professor.model";
import {AcademicYear} from "../../core/models/academic-year.model";
import {Enterprise} from "./entreprise.model";
import {SessionModel} from "./session.model";

export class Project {
  title: string;
  description: string;
  tags: string[];
  student: Student;
  supervisor: Professor;
  acceptedBySupervisor: boolean;
  validity: boolean;
  level: string;
  state: string;
  session: SessionModel;
  academicYear: AcademicYear;
  enterprise: Enterprise;
  enterpriseSupervisor: string;
}
