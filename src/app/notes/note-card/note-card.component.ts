import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/shared/services/notes.service';
import { NoteModal } from 'src/app/shared/note.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() noteData: NoteModal;
  @Input() noteId: number;
  @Output() delete:EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('contentText') contentText: ElementRef<HTMLElement>;

  constructor(public render: Renderer2, public notesService: NotesService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.toggleTruncator();
  }

  toggleTruncator() {
    let style = window.getComputedStyle(this.contentText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    if (viewableHeight < this.contentText.nativeElement.scrollHeight) {
      this.render.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else {
      this.render.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  // To delete the note
  deleteNote() {
    this.delete.emit();
  }

}
