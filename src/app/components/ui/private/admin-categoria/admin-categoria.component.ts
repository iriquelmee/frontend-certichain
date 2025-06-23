import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-categoria',
  imports: [CardModule],
  templateUrl: './admin-categoria.component.html',
  styleUrl: './admin-categoria.component.scss'
})
export class AdminCategoriaComponent {
  title : string = "Categoria ";
}
