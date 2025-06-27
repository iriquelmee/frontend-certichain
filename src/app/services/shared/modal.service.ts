import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ModalComponent } from "../../components/shared/modal/modal.component";

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalComponent?: ModalComponent;

  register(modal: ModalComponent) {
    this.modalComponent = modal;
  }

  show(title: string, content: string, onClose?: () => void) {
    this.modalComponent?.open(title, content, onClose);
  }

  showForm(title: string, form: FormGroup, onSave?: (data: any) => void, onClose?: () => void) {
    this.modalComponent?.openWithForm(title, form, onSave, onClose);
  }

  close() {
    this.modalComponent?.close();
  }
}
