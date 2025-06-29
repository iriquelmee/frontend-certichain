import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserInfoComponentComponent } from '../../../user-info/user-info-component/user-info-component.component';
import { DocumentRequestComponentComponent } from '../../../user-info/document-request-component/document-request-component.component';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { DocumentRequest } from '../../../../models/document-request';
import { AuthService } from '../../../../services/auth/auth.service';
import { AuthState, User } from '../../../../models/user.model';
import { DocumentInfo } from '../../../user-info/document-list-component/document-list-component.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-usuarios-informacion',
    imports: [CardModule, UserInfoComponentComponent, DocumentRequestComponentComponent],
    templateUrl: './usuarios-informacion.component.html',
    styleUrl: './usuarios-informacion.component.scss'
})
export class UsuariosInformacionComponent {
    authState: AuthState | null = null;
    title: string = "Informacion";
    private sub!: Subscription;

    user: User | null = null;
    institutions = [];
    documents = [];

    constructor(private documentService: DocumentServiceService, private authService: AuthService) { }

    ngOnInit() {
        this.sub = this.authService.authState$
        .subscribe(state => this.authState = state);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    onEditUser() {
        console.log('Editar usuario');
    }

    onNewRequest(ev: { institution: string; document: string }) {
        console.log('Solicitar:', ev);
        const payload: DocumentRequest = {
            id: '',
            requesterID: this.authState?.user?.id ?? '',
            issuerID: 'test',//ev.institution,
            date: new Date().toISOString(),
            documentTypeID: 'test',//ev.document,
            state: 'CREADO'
        };

        this.documentService.createRequest(payload).subscribe({
            next: (resp) => {
                const info: DocumentInfo = {
                    name: resp.documentTypeID,
                    date:      
                        new Date(resp.date).toLocaleDateString(),
                    institution: resp.issuerID
                };
            },
            error: (err) => {
                console.error('Error creando solicitud:', err);
            }
        });

    }
}
