import {Component, OnInit} from '@angular/core';
import * as webmidi from 'webmidi';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import * as Tone from 'tone';

@Component({
  selector: 'app-midi',
  templateUrl: './midi-selector.component.html',
  styleUrls: ['./midi-selector.component.css']
})
export class MidiSelectorComponent implements OnInit {

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

  outputList = [];
  inputList = [];
  inputs;
  outputs;
  wm = webmidi.default;

  noteOnSubject: Subject<string> = new Subject<string>();
  noteOffSubject: Subject<string> = new Subject<string>();

  refresh() {
    this.outputList = this.wm.outputs;
    this.inputList = this.wm.inputs;
  }

  ngOnInit() {
    this.inputs = new FormControl([]);
    this.outputs = new FormControl([]);
  }

  changeInputs() {
    this.wm.inputs.forEach((input) => {
      input.removeListener();
      if (this.inputs.value.includes(input._midiInput.name)) {
        this.addListeners(input);
      }
    });
  }

  private addListeners(input) {
    input.addListener('noteon', 'all',
      (e) => {
        console.log('Received \'noteon\' message (' + e.note.name + e.note.octave + ').');
        this.sendNoteOnToSynths(e.note);
      }
    );

    input.addListener('noteoff', 'all',
      (e) => {
        console.log('Received \'noteoff\' message (' + e.note.name + e.note.octave + ').');
        this.sendNoteOffToSynths(e.note);
      }
    );

    // Listen to pitch bend message on channel 3
    input.addListener('pitchbend', 3,
      (e) => {
        console.log('Received \'pitchbend\' message.', e);
      }
    );

    // Listen to control change message on all channels
    input.addListener('controlchange', 'all',
      (e) => {
        console.log('Received \'controlchange\' message.', e);
      }
    );

    // Listen to NRPN message on all channels
    input.addListener('nrpn', 'all',
      (e) => {
        if (e.controller.type === 'entry') {
          console.log('Received \'nrpn\' \'entry\' message.', e);
        }
        if (e.controller.type === 'decrement') {
          console.log('Received \'nrpn\' \'decrement\' message.', e);
        }
        if (e.controller.type === 'increment') {
          console.log('Received \'nrpn\' \'increment\' message.', e);
        }
        console.log('message value: ' + e.controller.value + '.', e);
      }
    );
  }

  changeOutputs() {

  }

  private sendNoteOnToSynths(note: any) {
    this.noteOnSubject.next(note.name + note.octave);
  }

  private sendNoteOffToSynths(note: any) {
    this.noteOffSubject.next(note.name + note.octave);
  }
}
