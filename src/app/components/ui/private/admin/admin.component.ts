import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';

@Component({
  selector: 'app-admin',
  imports: [CardModule,TabComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  tabs: { title: string; value: number; content: string }[] = [];

  ngOnInit() {
      this.tabs = [
          { title: 'Usuarios', value: 0, content: 'Tab 1 Content' },
          { title: 'Categorias', value: 1, content: 'Tab 2 Content' },
          { title: 'Auditoría', value: 2, content: 'Tab 3 Content' },
      ];
  }
  title : string = "Administración";

}
