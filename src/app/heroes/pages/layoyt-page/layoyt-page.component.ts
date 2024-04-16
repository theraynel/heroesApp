import { Component } from '@angular/core';

@Component({
  selector: 'app-layoyt-page',
  templateUrl: './layoyt-page.component.html',
  styles: [
  ]
})
export class LayoytPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Anadir', icon: 'add', url: './new-hero'},
    { label: 'Buscar', icon: 'search', url: './search'},
  ]

}
