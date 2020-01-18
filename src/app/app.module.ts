import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MidiSelectorComponent } from './midi/midi-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MidiSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
