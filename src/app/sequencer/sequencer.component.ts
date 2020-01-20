import {Component, NgZone, OnInit} from '@angular/core';
import * as Tone from 'tone';
import {Observable, of, Subject} from 'rxjs';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  private seq;

  private columns = 20;
  private columnArray = {};
  private notes: string[];
  private sequenceArrays;

  noteOnSubject: Subject<string> = new Subject<string>();
  noteOffSubject: Subject<string> = new Subject<string>();
    currentColumn: Observable<number> = new Observable<number>();
  private zone: NgZone;
  private notesOn: string[] = [];

  constructor(zone: NgZone) {
    this.zone = zone;
    this.notes = ['C4', 'D4', 'E4', 'G4', 'A4', 'C3', 'D3', 'E3',  'G3', 'A3'];
    this.notes.forEach((note) => {
      this.columnArray[note] = Array(this.columns).fill(false);
    });
    console.log(this.columnArray);
  }


  ngOnInit() {
    this.currentColumn = of(1 );
    const indices = this.columnArray[this.notes[0]].map((x, i) => i);
    this.seq = new Tone.Sequence((time, index: number) => {
      const notes = Object.keys(this.columnArray);

      this.zone.run(() => {
        this.currentColumn = of(index);
      });
      this.currentColumn = of(index);

      notes.forEach((note) => {
        if (this.notesOn.includes(note)) {
          this.noteOffSubject.next(note);
        }

        if (this.columnArray[note][index]) {
          this.noteOnSubject.next(note);
          this.notesOn.push(note);
        }
      });

    }, indices, '8n').start(0);
  }


  toggleTile(col: any, note: string) {
    this.columnArray[note][col] = !this.columnArray[note][col];
  }

  clear() {
    this.notes.forEach((note) => {
      this.columnArray[note] = Array(this.columns).fill(false);
    });
  }
}
