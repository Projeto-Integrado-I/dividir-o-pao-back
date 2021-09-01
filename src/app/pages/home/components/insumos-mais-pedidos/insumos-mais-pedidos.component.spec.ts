import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosMaisPedidosComponent } from './insumos-mais-pedidos.component';

describe('InsumosMaisPedidosComponent', () => {
  let component: InsumosMaisPedidosComponent;
  let fixture: ComponentFixture<InsumosMaisPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumosMaisPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosMaisPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
