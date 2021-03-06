import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MidiSelectorComponent } from './midi/midi-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SynthComponent } from './synth/synth.component';
import { SequencerComponent } from './sequencer/sequencer.component';
import { TransportComponent } from './transport/transport.component';
import { PolysynthComponent } from './polysynth/polysynth.component';
import { SequencerSettingsComponent } from './sequencer-settings/sequencer-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MidiSelectorComponent,
    SynthComponent,
    SequencerComponent,
    TransportComponent,
    PolysynthComponent,
    SequencerSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatDialogModule
  ],
  entryComponents: [
    SequencerSettingsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
