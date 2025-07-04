import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableComponent } from '../../../shared/table/table.component';
import { institucionSolicitudes, institucionSolicitudesColumns } from '../../../../../data';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentServiceService } from '../../../../services/document/document-service.service';
import { DocumentRequest } from '../../../../models/document-request';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-instituciones-solicitudes',
    imports: [CardModule, TableComponent, CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './instituciones-solicitudes.component.html',
    styleUrl: './instituciones-solicitudes.component.scss'
})
export class InstitucionesSolicitudesComponent implements OnInit {
    title: string = "Solicitudes";
    data!: any[];
    tableSolicitudesColumns!: any[];
    mode: 'solicitar' | 'emitir' = 'solicitar';
    requestForm!: FormGroup;
    emitForm!: FormGroup;
    foundRequest?: DocumentRequest;
    selectedFile?: File;
    institutions = [
        { id: 'inst1', name: 'Institución A' },
        { id: 'inst2', name: 'Institución B' },
    ];
    documents = [
        { id: 'doc1', name: 'Documento X' },
        { id: 'doc2', name: 'Documento Y' },
    ];

    constructor(
        private fb: FormBuilder,
        private docSvc: DocumentServiceService
    ) { }

    ngOnInit(): void {
        this.callApiSolicitudes();

        if (this.data != undefined) {
            this.setTableColumnsHeaders();
        }

        this.requestForm = this.fb.group({
            institution: [null],
            documentType: [null],
        });
        this.emitForm = this.fb.group({
            id: [''],
            name: [{ value: '', disabled: true }],
            documentType: [null],
        });
    }

    callApiSolicitudes() {
        this.data = institucionSolicitudes;
    }

    setTableColumnsHeaders() {
        this.tableSolicitudesColumns = institucionSolicitudesColumns;
    }

    setMode(m: 'solicitar' | 'emitir') {
        this.mode = m;
        this.requestForm.reset();
        this.emitForm.reset();
        this.foundRequest = undefined;
        this.selectedFile = undefined;
    }

    onSolicitar() {
        const dto: DocumentRequest = {
            id: null,
            requesterID: 'CURRENT_USER_ID',
            issuerID: this.requestForm.value.institution,
            date: new Date().toISOString(),
            documentTypeID: this.requestForm.value.documentType,
            state: 'REQUESTED'
        };
        this.docSvc.createRequest(dto).subscribe(res => {
            alert(`Solicitud creada con ID ${res.id}`);
            this.requestForm.reset();
        });
    }

    onBuscar() {
        const searchId = this.emitForm.value.id;
        /*this.docSvc.getRequestById(searchId).subscribe(req => {
            this.foundRequest = req;
            this.emitForm.patchValue({
                name: req.requesterID,
                documentType: req.documentTypeID
            });
        });*/
    }

    onFileSelected(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.files?.length) {
            this.selectedFile = input.files[0];
        }
    }

    onEmitir() {
        if (!this.foundRequest || !this.selectedFile) {
            alert('Primero busca la solicitud y carga un archivo.');
            return;
        }
        const dto: DocumentRequest = {
            id: null,
            requesterID: this.foundRequest.requesterID,
            issuerID: this.foundRequest.issuerID,
            date: new Date().toISOString(),
            documentTypeID: this.emitForm.value.documentType,
            state: 'EMITTED'
        };
        this.docSvc.createRequest(dto).pipe(
            switchMap(created => this.docSvc.uploadDocument(created.id!, this.selectedFile!))
        ).subscribe(() => {
            alert('Documento emitido correctamente.');
            this.emitForm.reset();
            this.foundRequest = undefined;
            this.selectedFile = undefined;
        });
    }

}
