import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencerSettingsComponent } from './sequencer-settings.component';

describe('SequencerSettingsDialogComponent', () => {
  let component: SequencerSettingsComponent;
  let fixture: ComponentFixture<SequencerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
