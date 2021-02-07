export class Student {
  public firstName: string;
  public lastName: string;
  public email: string;
  public field: string;
  public cin: number;
  public registrationNumber: number;


  constructor(firstName?: string, lastName?: string, email?: string, field?: string, cin?: number, registrationNumber?: number) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.field = field || '';
    this.cin = cin || 0o0000000;
    this.registrationNumber = registrationNumber || 0o000000 ;
  }
}
