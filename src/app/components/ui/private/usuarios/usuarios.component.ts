import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { tabsUsuarios } from '../../../../../data';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { AuthState } from '../../../../models/user.model';
import { Subscription } from 'rxjs';
import { SearchDocumentRequestInfo } from '../../../../models/search-document-request-info';
import { CommonModule } from '@angular/common';
import { UsuariosInformacionComponent } from '../usuarios-informacion/usuarios-informacion.component';

@Component({
    selector: 'app-usuarios',
    imports: [CommonModule,CardModule, UsuariosInformacionComponent],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
    tabs: any[] = [];
    results: SearchDocumentRequestInfo[] = [];
    title: string = "Usuarios";
    selectedTabIndex = 0;
    authState: AuthState | null = null;
    private sub!: Subscription;

    constructor(private documentService: DocumentServiceService, private authService: AuthService) { }

    ngOnInit() {
        this.tabs = tabsUsuarios;
        this.sub = this.authService.authState$
        .subscribe(state => this.authState = state);
    }

    onTabChange(index: number) {
        this.selectedTabIndex = index;
        if (this.tabs[index].title === 'Solicitudes') {
            this.documentService
                .userSearchRequests(this.authState?.user?.id ?? '', '', '', '')
                .subscribe({
                    next: (data) => {
                        this.results = data;
                        console.log('userSearchRequests result:', data);
                    },
                    error: (err) => {
                        console.error('Error al buscar solicitudes:', err);
                    }
                });
        }
    }

}
