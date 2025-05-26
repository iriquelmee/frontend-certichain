import { Component, OnInit } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ModalService } from '../../../services/shared/modal.service';


@Component({
  selector: 'app-modal',
  imports:[DialogModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  visible = false;
  title = '';
  content = '';
  onCloseCallback?: () => void;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register(this);
  }

  open(title: string, content: string, onClose?: () => void) {
    this.title = title;
    this.content = content;
    this.visible = true;
    this.onCloseCallback = onClose;
  }

  close() {
    this.visible = false;
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }
}