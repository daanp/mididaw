import {Component, NgZone, OnInit} from '@angular/core';
import * as Tone from 'tone';
import {Observable, of, Subject} from 'rxjs';
import {SequencerSettings, SequencerSettingsComponent} from '../sequencer-settings/sequencer-settings.component';
import {MatDialog} from '@angular/material';
import {Scale} from 'tonal';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  private seq;

  private columns = 16;
  private columnArray = {};
  private notes: string[];

  noteOnSubject: Subject<string> = new Subject<string>();
  noteOffSubject: Subject<string> = new Subject<string>();
  currentColumn: Observable<number> = new Observable<number>();
  private zone: NgZone;
  private notesOn: string[] = [];
  private indices: any;

  constructor(zone: NgZone, public dialog: MatDialog) {
    this.zone = zone;
  }


  private setUpParams() {
    this.notes.forEach((note) => {
      if (!this.columnArray[note]) {
        this.columnArray[note] = Array(this.columns).fill(false);
      }
    });

    const removedNotes = Object.keys(this.columnArray).filter(key => !this.notes.includes(key));
    removedNotes.forEach((removedNote) => {
      delete this.columnArray[removedNote];
    });

    this.indices = this.columnArray[this.notes[0]].map((x, i) => i);

    this.currentColumn = of(1);
  }

  ngOnInit() {

    this.notes = ['C4', 'D4', 'E4', 'G4', 'A4', 'C3', 'D3', 'E3', 'G3', 'A3'];
    this.setUpParams();

    this.seq = this.getSequence();
    this.seq.start(0);
  }


  private getSequence() {
    return new Tone.Sequence((time, index: number) => {
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

    }, this.indices, '8n');
  }

  toggleTile(col: any, note: string) {
    this.columnArray[note][col] = !this.columnArray[note][col];
  }

  clear() {
    this.notes.forEach((note) => {
      this.columnArray[note] = Array(this.columns).fill(false);
    });
  }

  openSettingsDialog() {
    this.stop();

    const dialogRef = this.dialog.open(SequencerSettingsComponent, {
      width: '450px',
      height: '300px',
      data: {columns: this.columns}
    });

    dialogRef.afterClosed().subscribe((result: SequencerSettings) => {
      if (result) {
        this.notes = Scale.notes(result.tonic + result.octave + ' ' + result.scale);
        this.columns = parseInt(result.columns);
        this.stop();
        this.setUpParams();
        console.log('disposing of sequence');
        this.seq.dispose();
        this.seq = this.getSequence();
      }
    });
  }

  start() {
    this.seq.start(0);
  }

  stop() {
    this.notes.forEach(note => {
      this.noteOffSubject.next(note);
    });
    this.seq.stop(0);
  }
}
