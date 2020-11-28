import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioTipoRedeComponent } from './relatorio-tipo-rede.component';

describe('RelatorioTipoRedeComponent', () => {
  let component: RelatorioTipoRedeComponent;
  let fixture: ComponentFixture<RelatorioTipoRedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioTipoRedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioTipoRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
