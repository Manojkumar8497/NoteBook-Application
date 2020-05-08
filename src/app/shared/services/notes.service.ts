import { Injectable } from '@angular/core';
import { NoteModal } from '../note.model';
import { not } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: NoteModal[] = new Array<NoteModal>();

  constructor() { }

  // Get all notes
  getNotes() {
    return this.notes;
  }

  // Get the single note
  getNote(id: number) {
    return this.notes[id];
  }

  // Get the note Id
  getNoteId(note: NoteModal) {
    return this.notes.indexOf(note);
  }

  // Add the note into notes
  addNote(note: NoteModal) {
    let notesLength = this.notes.push(note);
    return notesLength - 1;
  }

  // Update the note
  updateNote(id: number, updatedNote: NoteModal) {
    let note = this.notes[id];
    note.title = updatedNote.title;
    note.content = updatedNote.content;
  }

  // Delete the note
  delete(id: number) {
    this.notes.splice(id, 1);
  }

}
