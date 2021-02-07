import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatMenuTrigger} from "@angular/material/menu";
import {SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {fromEvent} from "rxjs";
import {Professor} from "../model/professor.model";
import {ProfessorsService} from "../service/professors.service";
import {ProfessorDataSource} from "./ProfessorDataSource";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-professors-list',
  templateUrl: './professors-list.component.html',
  styleUrls: ['./professors-list.component.sass']
})
export class ProfessorsListComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild('filter', { static: true })
  filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  dataSource : ProfessorDataSource | null;

  selection: SelectionModel<Professor> = new SelectionModel<Professor>(true, []);
  displayedColumns = [
    'select',
    'name',
    'id',
    'department',
    'email',
    'actions'
  ];
  private id: number;


  constructor(
    private cdr: ChangeDetectorRef,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public professorService: ProfessorsService,
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
    console.log("Professor(s) removed");
  }

  deleteItem(row: Professor) {
    this.professorService.deleteProfessor(row);
  }

  editCall(row) {
    this.id = row.cin;
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        professor: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const professors: Professor[] = this.professorService.dataChange.value.slice();
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.professorService.dataChange.value.findIndex(
          (x) => x.cin === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        professors[
          foundIndex
          ] = this.professorService.getDialogData();
        // And lastly refresh table
        this.professorService.dataChange.next(professors);
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

    this.dataSource = new ProfessorDataSource(
      this.professorService,
      this.paginator,
      this.sort
    )
    this.dataSource._sort = this.sort;
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
