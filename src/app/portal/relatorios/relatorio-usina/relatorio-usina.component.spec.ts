import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioUsinaComponent } from './relatorio-usina.component';

describe('RelatorioUsinaComponent', () => {
  let component: RelatorioUsinaComponent;
  let fixture: ComponentFixture<RelatorioUsinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioUsinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioUsinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
