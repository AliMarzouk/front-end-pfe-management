import {Role} from "./role.enum";

export class User {
  email: string;
  role: Role;
  academicYear: {
    _id: string;
    endDate: number;
    startDate: number;
  }
  iat?: number;
  exp?: number;
  exp_date: Date;
  firstName?: string;
  lastName?: string;
}
