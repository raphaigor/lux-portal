import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendedorComponent } from './relatorio-vendedor.component';

describe('RelatorioVendedorComponent', () => {
  let component: RelatorioVendedorComponent;
  let fixture: ComponentFixture<RelatorioVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
