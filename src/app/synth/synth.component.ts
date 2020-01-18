import {Component, Input, OnInit} from '@angular/core';
import * as Tone from 'tone';
import {Synth} from 'tone';
import {Observable} from 'rxjs';
import {MatSliderChange} from '@angular/material';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.css']
})
export class SynthComponent implements OnInit {


  @Input()
  notesOn: Observable<string>;

  @Input()
  notesOff: Observable<string>;

  synth;

  notesDown = [];

  constructor() { }

  ngOnInit() {
    this.synth = new Tone.Synth().toMaster();

    this.notesOn.subscribe((note) => {
      if (this.notesDown.length === 0) {
        this.synth.triggerAttack(note);
      } else {
        this.synth.setNote(note);
      }
      this.notesDown.push(note);

    });
    this.notesOff.subscribe((note) => {
      this.notesDown.splice( this.notesDown.indexOf(note), 1 );
      if (this.notesDown.length === 0) {
        this.synth.triggerRelease();
      } else {
        this.synth.setNote(this.notesDown[this.notesDown.length - 1]);
      }
    });
  }

}
