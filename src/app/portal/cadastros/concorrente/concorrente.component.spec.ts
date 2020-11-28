import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcorrenteComponent } from './concorrente.component';

describe('ConcorrenteComponent', () => {
  let component: ConcorrenteComponent;
  let fixture: ComponentFixture<ConcorrenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcorrenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
