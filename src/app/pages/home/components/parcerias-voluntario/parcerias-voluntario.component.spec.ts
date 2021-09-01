import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceriasVoluntarioComponent } from './parcerias-voluntario.component';

describe('ParceriasVoluntarioComponent', () => {
  let component: ParceriasVoluntarioComponent;
  let fixture: ComponentFixture<ParceriasVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParceriasVoluntarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceriasVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
