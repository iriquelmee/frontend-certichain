import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { DemoComponent } from '../demo/demo.component';
import { AdminAuditoriaComponent } from '../../private/admin-auditoria/admin-auditoria.component';
import { AdminCategoriaComponent } from '../../private/admin-categoria/admin-categoria.component';
import { AdminUsuariosComponent } from '../../private/admin-usuarios/admin-usuarios.component';
import { InstitucionesOtrasSolicitudesComponent } from '../../private/instituciones-otras-solicitudes/instituciones-otras-solicitudes.component';
import { InstitucionesTiposDocumentosComponent } from '../../private/instituciones-tipos-documentos/instituciones-tipos-documentos.component';
import { InstitucionesSolicitudesComponent } from '../../private/instituciones-solicitudes/instituciones-solicitudes.component';
import { UsuariosInformacionComponent } from '../../private/usuarios-informacion/usuarios-informacion.component';
import { UsuariosSolicitudesComponent } from '../../private/usuarios-solicitudes/usuarios-solicitudes.component';
import { SearchDocumentRequestInfo } from '../../../../models/search-document-request-info';

@Component({
    selector: 'app-tab',
    imports: [CardModule, TabsModule, AdminAuditoriaComponent, AdminCategoriaComponent, AdminUsuariosComponent, InstitucionesSolicitudesComponent, InstitucionesOtrasSolicitudesComponent, InstitucionesTiposDocumentosComponent, UsuariosInformacionComponent, UsuariosSolicitudesComponent],
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss'
})
export class TabComponent {
    @Input() data: { title: string; value: number; content: string; type?: 'text' | 'component'; component?: string }[] = [];
    @Output() tabChange = new EventEmitter<number>();
    @Input() requests: SearchDocumentRequestInfo[] = [];
    selectedIndex = 0;

    selectTab(value: string | number) {
        const index = typeof value === 'string'
            ? parseInt(value, 10)
            : value;
        this.selectedIndex = index;
        this.tabChange.emit(index);
    }

}
