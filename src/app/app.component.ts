import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [
    {
      id: 1,
      title: 'Mock Title',
      body: 'mock body',
      color: '#ff0000',
      favourite: true
    }
  ];
  selected: Partial<Note>;
  public creatingNote: boolean = false;

  private service: NotesService;

  constructor(private notesService: NotesService) {

  }

  ngOnInit() {
    this.loadNotes();
  }

  getNotes() {
    return this.notes;
  }
  
  selectNote(note: Note) {
    this.creatingNote = false;
    this.selected = note;
  }
  
  onSubmit(form: any) {
    if (this.creatingNote) {
      this.createNote(form.value);
    }
    else {
      this.saveNote(form.value);
    }
  }
  
  newNote() {
    this.selected = {};
    this.creatingNote = true;
  }

  saveNote(value: Note) {
    this.notesService.saveNote(this.notes.find(e => e.id === this.selected.id));

    const index = this.notes.findIndex((note) => this.selected.id === note.id);
    this.notes[index] = value;
  }

  private loadNotes(): void {
    this.notes = this.notesService.getNotes();
  }
  
  private createNote(value: Note) {
    let createdNote: Note = this.notesService.saveNote(value);
    
    this.selected = createdNote;
    this.creatingNote = false;
  }
}
