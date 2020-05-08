import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NoteModal } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  noteDetails: NoteModal;
  noteId: number;
  isEditable: Boolean = false;

  constructor(public router: Router, public notesService: NotesService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.noteDetails = new NoteModal('', '');
    this.checkEditable();
  }

  checkEditable() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        const id = +params.id.split('_')[1];
        this.noteDetails = this.notesService.getNote(id);
        this.noteId = id;
        this.isEditable = true;
      }
      else {
        this.isEditable = false;
      }
    })
  }

  onSaveNote(form: NgForm) {
    if (!this.noteDetails.title && !this.noteDetails.content) {
      return null;
    }
    if (this.isEditable) {
      // To Edit the notes
      this.notesService.updateNote(this.noteId, form.value);
      this.router.navigate(['/']);
    }
    else {
      // To create new notes
      this.notesService.addNote(form.value);
      this.router.navigate(['/']);
    }
  }

}
