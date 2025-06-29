import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
    @Input() items: DocumentInfo[] = [];

    @Output() download = new EventEmitter<DocumentInfo>();
    @Output() view = new EventEmitter<DocumentInfo>();

    onDownload(item: DocumentInfo) {
        this.download.emit(item);
    }

    onView(item: DocumentInfo) {
        this.view.emit(item);
    }
}
