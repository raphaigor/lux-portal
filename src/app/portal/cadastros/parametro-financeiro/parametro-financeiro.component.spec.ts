import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroFinanceiroComponent } from './parametro-financeiro.component';

describe('ParametroFinanceiroComponent', () => {
  let component: ParametroFinanceiroComponent;
  let fixture: ComponentFixture<ParametroFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
