import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosInsumosSolicitadosComponent } from './ultimos-insumos-solicitados.component';

describe('UltimosInsumosSolicitadosComponent', () => {
  let component: UltimosInsumosSolicitadosComponent;
  let fixture: ComponentFixture<UltimosInsumosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimosInsumosSolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosInsumosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
