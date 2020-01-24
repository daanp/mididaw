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

  polySynth;

  notesDown = [];
  oscillatorTypeList: any = [
    {
      name: 'square',
      listName: 'Square'
    },
    {
      name: 'sine',
      listName: 'Sine'
    },
    {
      name: 'triangle',
      listName: 'Triangle'
    },
    {
      name: 'sawtooth',
      listName: 'Sawtooth'
    },
  ];
  oscillatorType: FormControl;
  name: string;
  synth: Tone.Synth;

  constructor() {
  }

  ngOnInit() {
    this.name = 'PolySynth';
    this.polySynth = new Tone.PolySynth(500  ).toMaster();
    this.polySynth.sync();

    this.oscillatorType = new FormControl('');


    this.synth = this.polySynth.get();
    console.log(this.synth);
    this.notesOn.subscribe((note) => {
      this.polySynth.triggerAttack(note);
      console.log('trigger attack ' + note);
    });
    this.notesOff.subscribe((note) => {
      this.polySynth.triggerRelease(note, '+0.01');
      console.log('trigger release ' + note);
    });
  }


  setPolySynth() {
    this.polySynth.set(this.synth);
  }

  changeOscillatorType() {
    this.synth.oscillator.type = this.oscillatorType.value;
    this.polySynth.set(this.synth);
  }

}
