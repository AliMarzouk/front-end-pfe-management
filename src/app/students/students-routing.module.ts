import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddStudentsComponent} from "./add-students/add-students.component";
import {StudentsListComponent} from "./students-list/students-list.component";


const routes: Routes = [
  {
  path: '',
  redirectTo: 'add',
  pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddStudentsComponent
  },
  {
    path: 'list',
    component: StudentsListComponent
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentsRoutingModule {

}
