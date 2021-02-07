import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";
import {AddProfessorComponent} from "../professors/add-professor/add-professor.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddProfessorComponent
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
export class SessionsRoutingModule {

}
