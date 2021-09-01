import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesArrecadadasComponent } from './doacoes-arrecadadas.component';

describe('DoacoesArrecadadasComponent', () => {
  let component: DoacoesArrecadadasComponent;
  let fixture: ComponentFixture<DoacoesArrecadadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoacoesArrecadadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacoesArrecadadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
