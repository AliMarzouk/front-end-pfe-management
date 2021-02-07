import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {StudentDataSource} from "../../students/students-list/StudentDataSource";
import {SelectionModel} from "@angular/cdk/collections";
import {Student} from "../../students/model/student.model";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {StudentService} from "../../students/service/student.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormComponent} from "../../students/form/form.component";
import {fromEvent} from "rxjs";
import {SessionsDataSource} from "./SessionsDataSource";
import {SessionModel} from "../Model/session.model";
import {SessionsService} from "../service/sessions.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild('filter', { static: true })
  filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  dataSource : SessionsDataSource | null;

  selection: SelectionModel<SessionModel> = new SelectionModel<SessionModel>(true, []);
  displayedColumns = [
    'select',
    'start',
    'end',
    'prof',
    'capacity'
  ];
  private id: number;


  constructor(
    private cdr: ChangeDetectorRef,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public sessionsService: SessionsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // setTimeout(() => this.loadData(),20000);
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  removeSelectedRows() {
    console.log("Session(s) removed");
  }

  deleteItem(row: SessionModel) {
    this.sessionsService.deleteStudent(row);
  }

  editCall(row) {
    console.log(row);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  public loadData() {

    this.dataSource = new SessionsDataSource(
      this.sessionsService,
      this.paginator,
      this.sort
    )
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}


