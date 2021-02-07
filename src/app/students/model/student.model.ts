export class Student {
  public firstName: string;
  public lastName: string;
  public email: string;
  public field: string;
  public cin: string;
  public nce: string;
  public level: string;


  constructor(firstName?: string, lastName?: string, email?: string, field?: string,
              cin?: string, registrationNumber?: string, level?: string) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.field = field || '';
    this.cin = cin || '00000000';
    this.nce = registrationNumber || '0000000' ;
    this.level = level || '';
  }
}
