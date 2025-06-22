import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-tab',
  imports: [CardModule,TabsModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {

  @Input() data: any[] = [];

}
