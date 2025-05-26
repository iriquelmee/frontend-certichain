import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnChanges {
  @Input() label: string = 'Botón';
  @Input() icon?: string;
  @Input() type:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'help'
  | 'contrast' = 'primary';

  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<Event>();

  iconToShow: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['label'] || changes['type']) {
      this.setIcon();
    }
  }

  setIcon() {

    if (this.icon) {
      this.iconToShow = this.icon;
      return;
    }

    switch (this.type) {
      case 'primary':
        this.iconToShow = 'pi pi-check';
        break;
      case 'secondary':
        this.iconToShow = 'pi pi-pencil';
        break;
      case 'success':
        this.iconToShow = 'pi pi-check-circle';
        break;
      case 'info':
        this.iconToShow = 'pi pi-info-circle';
        break;
      case 'warning':
        this.iconToShow = 'pi pi-exclamation-triangle';
        break;
      case 'danger':
        this.iconToShow = 'pi pi-times';
        break;
      case 'help':
        this.iconToShow = 'pi pi-question-circle';
        break;
      case 'contrast':
        this.iconToShow = 'pi pi-adjust';
        break;
      default:
        this.iconToShow = '';
        break;
    }
  }

  handleClick($event: any) {
    this.onClick.emit($event);
  }
}
