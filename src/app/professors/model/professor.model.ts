export class Professor {
  public _id?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public department: string;
  public cin: number;
  public isActive: boolean;


  constructor(firstName?: string, lastName?: string, email?: string, department?: string, cin?: number, isActive?:boolean) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.department = department || '';
    this.cin = cin || 0o0000000;
    this.isActive = isActive || true;
  }
}
