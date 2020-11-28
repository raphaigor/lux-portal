import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsinaComponent } from './usina.component';

describe('UsinaComponent', () => {
  let component: UsinaComponent;
  let fixture: ComponentFixture<UsinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
