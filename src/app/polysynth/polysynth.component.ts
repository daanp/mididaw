import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import * as Tone from 'tone';

@Component({
  selector: 'app-polysynth',
  templateUrl: './polysynth.component.html',
  styleUrls: ['./polysynth.component.css']
})
export class PolysynthComponent implements OnInit {

  @Input()
  notesOn: Observable<string>;

  @Input()
  notesOff: Observable<string>;

  synth;

  notesDown = [];
  oscillatorTypeList: any = [
    { name: 'square',
      listName: 'Square'
    },
    { name: 'sine',
      listName: 'Sine'
    },
    { name: 'triangle',
      listName: 'Triangle'
    },
    { name: 'sawtooth',
      listName: 'Sawtooth'
    },
  ];
  oscillatorType: FormControl;
  name: string;

  constructor() { }

  ngOnInit() {
    this.name = 'PolySynth';
    this.synth = new Tone.PolySynth(10).toMaster();

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
        this.synth.triggerRelease(note);
      }
    });
  }


}
