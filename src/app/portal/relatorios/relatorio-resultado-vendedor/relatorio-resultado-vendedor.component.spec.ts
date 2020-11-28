import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioResultadoVendedorComponent } from './relatorio-resultado-vendedor.component';

describe('RelatorioResultadoVendedorComponent', () => {
  let component: RelatorioResultadoVendedorComponent;
  let fixture: ComponentFixture<RelatorioResultadoVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioResultadoVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioResultadoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
