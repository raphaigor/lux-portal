import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeEletricaComponent } from './rede-eletrica.component';

describe('RedeEletricaComponent', () => {
  let component: RedeEletricaComponent;
  let fixture: ComponentFixture<RedeEletricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeEletricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeEletricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
