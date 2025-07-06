import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabComponent } from '../../shared/tab/tab.component';
import { tabsInstituciones } from '../../../../../data';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-instituciones',
    imports: [CardModule, TabComponent],
    templateUrl: './instituciones.component.html',
    styleUrl: './instituciones.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class InstitucionesComponent implements OnInit {
    title: string = "Institucion";
    tabs: any[] = [];
    userData: any = {};

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        const currentUser = this.authService.currentUser;
        this.tabs = tabsInstituciones;

        this.userData = {
            Id: currentUser?.id || '',
            UserID: currentUser?.username || '',
            UserTypeId: currentUser?.groups?.length ? currentUser.groups[0] : 'user',
            UserSubTypeId: 'user',
            name: currentUser?.username || '',
            email: currentUser?.email || ''
        };

    }

}
