import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDoacaoModalComponent } from './alterar-doacao-modal.component';

describe('AlterarDoacaoModalComponent', () => {
  let component: AlterarDoacaoModalComponent;
  let fixture: ComponentFixture<AlterarDoacaoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarDoacaoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDoacaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
