
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ConfirmDialog, ToastModule, ButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  @Input() header: string = 'Confirmación';
  @Input() message: string = '¿Estás seguro?';
  @Input() icon: string = 'pi pi-exclamation-triangle';

  @Input() acceptLabel: string = 'Aceptar';
  @Input() acceptSeverity: string = 'success';

  @Input() rejectLabel: string = 'Cancelar';
  @Input() rejectSeverity: string = 'secondary';

  @Input() closable: boolean = true;
  @Input() closeOnEscape: boolean = true;

  @Output() accept = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  showConfirm(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.message,
      header: this.header,
      icon: this.icon,
      closable: this.closable,
      closeOnEscape: this.closeOnEscape,
      acceptButtonProps: {
        label: this.acceptLabel,
        severity: this.acceptSeverity,
      },
      rejectButtonProps: {
        label: this.rejectLabel,
        severity: this.rejectSeverity,
        outlined: true
      },
      accept: () => {
        this.accept.emit();
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Acción aceptada' });
      },
      reject: () => {
        this.reject.emit();
        this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Acción cancelada' });
      }
    });
  }
}
