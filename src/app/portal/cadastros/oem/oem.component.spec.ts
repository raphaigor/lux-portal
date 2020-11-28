import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OemComponent } from './oem.component';

describe('OemComponent', () => {
  let component: OemComponent;
  let fixture: ComponentFixture<OemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
