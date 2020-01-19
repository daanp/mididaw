import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as Tone from 'tone';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  private seq;

  private columns = 4;
  private columnArray = {};
  private notes: string[];
  private sequenceArrays;

  notesOnSubject: Subject<string[]> = new Subject<string[]>();

  constructor() {
    console.log('test');
    this.notes = ['C4', 'G4'];
    this.notes.forEach((note) => {
      this.columnArray[note] = Array(this.columns).fill(false);
    });
    console.log(this.columnArray);
  }


  ngOnInit() {
    const indices = this.columnArray[this.notes[0]].map((x, i) => i);
    this.seq = new Tone.Sequence((time, index: number) => {
      const notes = Object.keys(this.columnArray);
      const notesOn = [];
      notes.forEach((note) => {
        console.log(this.columnArray[note][index]);
        if (this.columnArray[note][index]) {
          notesOn.push(note);
        }
      });

      this.notesOnSubject.next(notesOn);
    }, indices, '4n').start(0);
  }


  toggleTile(col: any, note: string) {
    this.columnArray[note][col] = !this.columnArray[note][col];
  }
}
