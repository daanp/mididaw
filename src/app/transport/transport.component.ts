import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  constructor() { }

  private bpm = 120;

  ngOnInit() {
    Tone.context.latencyHint = 'balanced';
  }

  start() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  changeBpm($event: Event) {
    console.log(this.bpm);
    Tone.Transport.bpm.value = this.bpm;
  }
}
