import { Component } from '@angular/core';
import { Card, CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-auditoria',
  imports: [CardModule, CardModule],
  templateUrl: './admin-auditoria.component.html',
  styleUrl: './admin-auditoria.component.scss'
})
export class AdminAuditoriaComponent {
  title : string = "Auditoria ";

}
