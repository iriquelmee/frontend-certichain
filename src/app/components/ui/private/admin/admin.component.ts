import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';
import { tabsAdmin } from '../../../../../data';

@Component({
  selector: 'app-admin',
  imports: [CardModule,TabComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  tabs: any[] = [];

  ngOnInit() {
      this.tabs = tabsAdmin;
  }
  title : string = "Administración";

}
