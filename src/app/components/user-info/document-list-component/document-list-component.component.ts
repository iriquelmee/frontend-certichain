import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchDocumentRequestInfo } from '../../../models/search-document-request-info';

export interface DocumentInfo {
    name: string;
    date: string;
    institution: string;
}

@Component({
    selector: 'app-document-list-component',
    imports: [CommonModule],
    templateUrl: './document-list-component.component.html',
    styleUrl: './document-list-component.component.scss'
})

export class DocumentListComponentComponent {
    @Input() items: SearchDocumentRequestInfo[] = [];
    @Output() download = new EventEmitter<SearchDocumentRequestInfo>();
    @Output() view = new EventEmitter<SearchDocumentRequestInfo>();

    onDownload(item: SearchDocumentRequestInfo) {
        this.download.emit(item);
    }

    onView(item: SearchDocumentRequestInfo) {
        this.view.emit(item);
    }
}
