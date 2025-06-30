import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-document-request-component',
    imports: [CommonModule, FormsModule],
    templateUrl: './document-request-component.component.html',
    styleUrl: './document-request-component.component.scss'
})

export class DocumentRequestComponentComponent {
    @Input() institutions: string[] = [];
    @Input() documents: string[] = [];

    selectedInstitution = '';
    selectedDocument = '';

    @Output() request = new EventEmitter<{
        institution: string;
        document: string;
    }>();

    onSubmit() {

        this.request.emit({
            institution: this.selectedInstitution,
            document: this.selectedDocument
        });

    }
}
