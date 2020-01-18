import {Component, OnInit} from '@angular/core';
import * as webmidi from 'webmidi';

@Component({
  selector: 'app-midi',
  templateUrl: './midi-selector.component.html',
  styleUrls: ['./midi-selector.component.css']
})
export class MidiSelectorComponent implements OnInit {

  outputs = [];
  inputs = [];
  wm = webmidi.default;

  constructor() {

    this.wm.enable((err) => {

      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log('WebMidi enabled!');
        console.log(this.wm.inputs);
        console.log(this.wm.outputs);
        this.outputs = this.wm.outputs;
        this.inputs = this.wm.inputs;
      }

    });
  }

  refresh() {
    this.outputs = this.wm.outputs;
    this.inputs = this.wm.inputs;
  }

  ngOnInit() {
  }

}
