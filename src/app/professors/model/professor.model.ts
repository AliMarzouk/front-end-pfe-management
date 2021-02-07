export class Professor {
  public firstName: string;
  public lastName: string;
  public email: string;
  public department: string;
  public cin: number;


  constructor(firstName?: string, lastName?: string, email?: string, department?: string, cin?: number) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.department = department || '';
    this.cin = cin || 0o0000000;
  }
}
