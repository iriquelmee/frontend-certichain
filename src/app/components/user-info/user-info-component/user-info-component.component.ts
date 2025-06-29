import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-user-info-component',
    imports: [CommonModule],
    templateUrl: './user-info-component.component.html',
    styleUrl: './user-info-component.component.scss'
})
export class UserInfoComponentComponent {
    @Input() username = '';
    @Input() email = '';
    @Output() edit = new EventEmitter<void>();
}
