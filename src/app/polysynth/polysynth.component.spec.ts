import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolysynthComponent } from './polysynth.component';

describe('PolysynthComponent', () => {
  let component: PolysynthComponent;
  let fixture: ComponentFixture<PolysynthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolysynthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolysynthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
