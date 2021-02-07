import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, merge, Observable} from "rxjs";
import {Student} from "../../students/model/student.model";
import {StudentService} from "../../students/service/student.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map} from "rxjs/operators";
import {SessionModel} from "../Model/session.model";
import {ProfessorsService} from "../../professors/service/professors.service";
import {SessionsService} from "../service/sessions.service";

export class SessionsDataSource extends DataSource<SessionModel>{

  _filterChange = new BehaviorSubject('');


  // @ts-ignore
  get filter(): string {
    return this._filterChange.value;
  }

  // @ts-ignore
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: SessionModel[] = [];
  renderedData: SessionModel[] = [];

  constructor(
    public _sessionService: SessionsService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SessionModel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._sessionService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._sessionService.getAllSessions();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._sessionService.data
          .slice()
          .filter((session: SessionModel) => {
            const searchStr = (
              session.startDate.toDateString() +
              session.endDate.toDateString()
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
  sortData(data: SessionModel[]): SessionModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'start':
          [propertyA, propertyB] = [a.startDate.toDateString(), b.startDate.toDateString()];
          break;
        case 'end':
          [propertyA, propertyB] = [+a.endDate.toDateString() , +b.endDate.toDateString()];
          break;
        case 'prof':
          [propertyA, propertyB] = [a.president.lastName, b.president.lastName];
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
