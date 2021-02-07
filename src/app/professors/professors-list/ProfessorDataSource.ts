import {DataSource} from "@angular/cdk/collections";
import {Professor} from "../model/professor.model";
import {BehaviorSubject, merge, Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map} from "rxjs/operators";
import {ProfessorsService} from "../service/professors.service";

export class ProfessorDataSource extends DataSource<Professor> {
  _filterChange = new BehaviorSubject('');


  // @ts-ignore
  get filter(): string {
    return this._filterChange.value;
  }

  // @ts-ignore
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Professor[] = [];
  renderedData: Professor[] = [];

  constructor(
    public _professorService: ProfessorsService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Professor[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._professorService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._professorService.getAllProfessors();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._professorService.data
          .slice()
          .filter((professor: Professor) => {
            const searchStr = (
              professor.lastName +
              professor.firstName +
              professor.cin +
              professor.department
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
  sortData(data: Professor[]): Professor[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [+a.cin, +b.cin];
          break;
        case 'name':
          [propertyA, propertyB] = [a.lastName + ' ' + a.firstName, b.lastName + ' ' + b.firstName];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'department':
          [propertyA, propertyB] = [a.department, b.department];
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
