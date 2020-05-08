import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteModal } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/services/notes.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*'
        })),
        animate(68)
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease-out')
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: NoteModal[] = new Array<NoteModal>();
  filteredNotes: NoteModal[] = new Array<NoteModal>();
  @ViewChild('filterRef') filterRef: ElementRef<HTMLInputElement>;

  constructor(public notesService: NotesService, public router: Router) { }

  ngOnInit(): void {
    this.getNotesData();
  }

  // Search filter
  filter(query: string) {
    let allResults: NoteModal[] = new Array<NoteModal>();
    query = query.toLowerCase().trim();
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);

    terms.forEach(term => {
      let results: NoteModal[] = this.relaventsNotes(term);
      allResults = [...allResults, ...results];
    })

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    this.sortByRelevancy(allResults);
  }

  // Remove Duplicates
  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(searchData => uniqueResults.add(searchData));
    return Array.from(uniqueResults);
  }

  // relavent notes
  relaventsNotes(query: any) {
    query = query.toLowerCase().trim();
    let releventNotes = this.notes.filter(el => {
      if (el.title.toLowerCase().includes(query) || el.content.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
    return releventNotes;
  }

  // Sort by relevence
  sortByRelevancy(searchResults: NoteModal[]) {
    let noteCountObj: Object = {};
    searchResults.forEach(note => {
      let noteId = this.notesService.getNoteId(note);
      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      }
      else {
        noteCountObj[noteId] = 1;
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: NoteModal, b: NoteModal) => {
      let aId = this.notesService.getNoteId(a);
      let bId = this.notesService.getNoteId(b);

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];

      return bCount - aCount;
    })
  }

  // To generate the Url
  generateUrl(note: NoteModal) {
    return this.notesService.getNoteId(note);
  }

  // Get the notes data
  getNotesData() {
    this.notes = this.notesService.getNotes();
    this.filteredNotes = this.notesService.getNotes();
  }

  // Delete note
  deleteNode(note: NoteModal) {
    const id = this.notesService.getNoteId(note);
    this.notesService.delete(id);
    this.filter(this.filterRef.nativeElement.value);
  }

}
