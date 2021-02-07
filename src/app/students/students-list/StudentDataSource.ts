import {DataSource} from "@angular/cdk/collections";
import {Student} from "../model/student.model";
import {BehaviorSubject, merge, Observable} from "rxjs";
import {StudentService} from "../service/student.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map} from "rxjs/operators";

export class StudentDataSource extends DataSource<Student> {
  _filterChange = new BehaviorSubject('');


  // @ts-ignore
  get filter(): string {
    return this._filterChange.value;
  }

  // @ts-ignore
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Student[] = [];
  renderedData: Student[] = [];

  constructor(
    public _studentService: StudentService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Student[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._studentService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._studentService.getAllStudents();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._studentService.data
          .slice()
          .filter((student: Student) => {
            const searchStr = (
              student.lastName +
              student.firstName +
              student.cin +
              student.nce +
              student.field
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Student[]): Student[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [+a.nce, +b.nce];
          break;
        case 'name':
          [propertyA, propertyB] = [a.lastName + ' ' + a.firstName, b.lastName + ' ' + b.firstName];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'cin':
          [propertyA, propertyB] = [+a.cin, +b.cin];
          break;
        case 'field':
          [propertyA, propertyB] = [a.field, b.field];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
