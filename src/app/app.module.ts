import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MidiSelectorComponent } from './midi/midi-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SynthComponent } from './synth/synth.component';

@NgModule({
  declarations: [
    AppComponent,
    MidiSelectorComponent,
    SynthComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
