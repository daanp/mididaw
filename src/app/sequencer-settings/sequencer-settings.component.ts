import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Scale} from 'tonal';
import {FormControl} from '@angular/forms';

export interface SequencerSettings {
  columns: string;
  tonic: string;
  scale: string;
  octave: number;
}

@Component({
  selector: 'app-sequencer-settings-dialog',
  templateUrl: './sequencer-settings.component.html',
  styleUrls: ['./sequencer-settings.component.css']
})
export class SequencerSettingsComponent implements OnInit {
  private scales: { notes: string[]; name: string }[];
  private tonics: string[];

  constructor(public dialogRef: MatDialogRef<SequencerSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public settings: SequencerSettings) {
  }

  ngOnInit() {
    this.tonics = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    this.scales = Scale.names().map(name => {
        return {
          name,
          notes: Scale.notes(name)
        };
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }
}
