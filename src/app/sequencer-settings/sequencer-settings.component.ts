import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface SequencerSettings {
  columns: string;
}

@Component({
  selector: 'app-sequencer-settings-dialog',
  templateUrl: './sequencer-settings.component.html',
  styleUrls: ['./sequencer-settings.component.css']
})
export class SequencerSettingsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SequencerSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public settings: SequencerSettings) {
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }
}
