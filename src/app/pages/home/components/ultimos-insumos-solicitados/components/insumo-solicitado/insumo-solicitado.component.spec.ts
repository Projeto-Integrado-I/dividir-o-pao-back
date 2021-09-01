import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoSolicitadoComponent } from './insumo-solicitado.component';

describe('InsumoSolicitadoComponent', () => {
  let component: InsumoSolicitadoComponent;
  let fixture: ComponentFixture<InsumoSolicitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumoSolicitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoSolicitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
