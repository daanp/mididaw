import {Component, OnInit} from '@angular/core';
import * as webmidi from 'webmidi';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-midi',
  templateUrl: './midi-selector.component.html',
  styleUrls: ['./midi-selector.component.css']
})
export class MidiSelectorComponent implements OnInit {

  outputList = [];
  inputList = [];
  inputs;
  outputs;
  wm = webmidi.default;

  constructor() {

    this.wm.enable((err) => {

      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log('WebMidi enabled!');
        console.log(this.wm.inputs);
        console.log(this.wm.outputs);
        this.outputList = this.wm.outputs;
        this.inputList = this.wm.inputs;
      }

    });
  }

  refresh() {
    this.outputList = this.wm.outputs;
    this.inputList = this.wm.inputs;
  }

  ngOnInit() {
    this.inputs = new FormControl([]);
    this.outputs = new FormControl([]);
  }

}
