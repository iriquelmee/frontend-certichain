import { Injectable } from "@angular/core";
import { ModalComponent } from "../../components/shared/modal/modal.component";

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalComponent?: ModalComponent;

  register(modal: ModalComponent) {
    this.modalComponent = modal;
  }

  show(title: string, content: string) {
    this.modalComponent?.open(title, content);
  }

  close() {
    this.modalComponent?.close();
  }
}
