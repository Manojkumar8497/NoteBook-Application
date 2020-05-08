import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: NotesListComponent, data: { animation: "isLeft" } },
      { path: 'new', component: NoteDetailsComponent, data: { animation: "isRight" } },
      { path: ':id', component: NoteDetailsComponent, data: { animation: "isRight" } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
