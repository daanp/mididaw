import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Tone.Transport.start();
  }

  start() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

}
