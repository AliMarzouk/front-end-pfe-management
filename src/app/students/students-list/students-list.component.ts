import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SelectionModel} from "@angular/cdk/collections";
import {Student} from "../model/student.model";
import { fromEvent} from "rxjs";
import {StudentService} from "../service/student.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentDataSource} from "./StudentDataSource";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.sass']
})
export class StudentsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild('filter', { static: true })
  filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  dataSource : StudentDataSource | null;

  selection: SelectionModel<Student> = new SelectionModel<Student>(true, []);
  displayedColumns = [
    'select',
    'name',
    'id',
    'cin',
    'field',
    'email',
    'actions'
  ];
  private id: number;


  constructor(
    private cdr: ChangeDetectorRef,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentService: StudentService,
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
    console.log("student(s) removed");
  }

  deleteItem(row: Student) {
    this.studentService.deleteStudent(row);
  }

  editCall(row) {
    this.id = row.nce;
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        student: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.studentService.dataChange.value.findIndex(
          (x) => +x.nce === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.studentService.dataChange.value[
          foundIndex
          ] = this.studentService.getDialogData();
        // And lastly refresh table
        this.studentService.dataChange.next(this.studentService.dataChange.value);
        // this.loadData();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
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

    this.dataSource = new StudentDataSource(
      this.studentService,
      this.paginator,
      this.sort
    )
    console.log('this.paginator');
    console.log(this.paginator);
    this.dataSource._sort = this.sort;
    console.log('this.sort')
    console.log(this.sort)
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
