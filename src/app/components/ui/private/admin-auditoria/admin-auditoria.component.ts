import { Component } from '@angular/core';
import { Card, CardModule } from 'primeng/card';
import { PublicDocumentAuditLog } from '../../../../models/public-document-audit-log';
import { DocumentAuditService } from '../../../../services/audit/document-audit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-auditoria',
    imports: [CommonModule, CardModule, FormsModule],
    templateUrl: './admin-auditoria.component.html',
    styleUrl: './admin-auditoria.component.scss'
})
export class AdminAuditoriaComponent {
    title: string = "Auditoria ";
    documentId: string = '';
    emisor: string = '';
    solicitante: string = '';

    startDate!: string;
    endDate!: string;

    logs: PublicDocumentAuditLog[] = [];
    loading = false;
    errorMsg: string | null = null;

    constructor(private auditSvc: DocumentAuditService) { }

    ngOnInit(): void {
        const now = new Date();
        const past = new Date(now);
        past.setDate(past.getDate() - 30);

        this.startDate = past.toISOString().slice(0, 16);
        this.endDate = now.toISOString().slice(0, 16);

        this.search();
    }

    private toRfc3339(date: string, isEnd: boolean = false): string {
        if (!date) return '';
        const d = new Date(date);
        if (isEnd) {
            d.setHours(23, 59, 59, 999);
        }
        return d.toISOString();
    }

    search(): void {
        this.loading = true;
        this.errorMsg = null;

        let filterType = 'all';
        let filterValue = '';
        if (this.documentId) {
            filterType = 'documentId';
            filterValue = this.documentId;
        } else if (this.emisor) {
            filterType = 'institution';
            filterValue = this.emisor;
        } else if (this.solicitante) {
            filterType = 'userId';
            filterValue = this.solicitante;
        }

        const start = this.toRfc3339(this.startDate);
        const end = this.toRfc3339(this.endDate, true);

        this.auditSvc.getPublicAuditLogs(filterType, filterValue, start, end)
            .subscribe({
                next: logs => {
                    this.logs = logs;
                    this.loading = false;
                },
                error: err => {
                    console.error(err);
                    this.errorMsg = 'Error al cargar registros';
                    this.loading = false;
                }
            });

    }

    onSearchClick(): void {
        if (this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
            this.errorMsg = 'Fecha de inicio no puede ser posterior a fecha de fin.';
            return;
        }
        this.search();
    }
}
