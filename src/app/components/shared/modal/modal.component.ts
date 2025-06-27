import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ModalService } from '../../../services/shared/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  visible = false;
  title = '';
  content = '';
  formData?: FormGroup;
  isFormMode = false;
  onCloseCallback?: () => void;
  onSaveCallback?: (data: any) => void;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register(this);
  }

  open(title: string, content: string, onClose?: () => void) {
    this.title = title;
    this.content = content;
    this.visible = true;
    this.isFormMode = false;
    this.onCloseCallback = onClose;
  }

  openWithForm(title: string, form: FormGroup, onSave?: (data: any) => void, onClose?: () => void) {
    this.title = title;
    this.formData = form;
    this.visible = true;
    this.isFormMode = true;
    this.onSaveCallback = onSave;
    this.onCloseCallback = onClose;
  }

  close() {
    this.visible = false;
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }

  save() {
    if (this.formData && this.formData.valid && this.onSaveCallback) {
      this.onSaveCallback(this.formData.value);
      this.visible = false;
    }
  }
}
