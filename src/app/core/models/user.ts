import {Role} from "./role.enum";
import {AcademicYear} from "./academic-year.model";

export class User {
  token: string;
  email: string;
  role: Role;
  academicYear: AcademicYear;
  iat?: number;
  exp?: number;
  exp_date: Date;
  firstName?: string;
  lastName?: string;
}
