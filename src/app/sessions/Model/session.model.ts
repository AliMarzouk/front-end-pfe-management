import {AcademicYear} from "../../core/models/academic-year.model";
import {Professor} from "../../professors/model/professor.model";
import {Conference} from "./conference.model";

export class SessionModel {
  startDate: Date;
  endDate: Date;
  president: Professor;
  capacity: number;
  academicYear: AcademicYear;
  conferences: [Conference];
}
