import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-secundaria',
  templateUrl: './barra-secundaria.component.html',
  styleUrls: ['./barra-secundaria.component.scss']
})
export class BarraSecundariaComponent {

  @Input() title: string = '';
  @Input() icone: string = '';

  constructor() { }

}
