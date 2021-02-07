import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddProfessorComponent} from "./add-professor/add-professor.component";
import {ProfessorsListComponent} from "./professors-list/professors-list.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddProfessorComponent
  },
  {
    path: 'list',
    component: ProfessorsListComponent
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
export class ProfessorsRoutingModule {

}
