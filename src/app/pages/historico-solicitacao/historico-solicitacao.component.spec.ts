import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSolicitacaoComponent } from './historico-solicitacao.component';

describe('HistoricoSolicitacaoComponent', () => {
  let component: HistoricoSolicitacaoComponent;
  let fixture: ComponentFixture<HistoricoSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoSolicitacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
