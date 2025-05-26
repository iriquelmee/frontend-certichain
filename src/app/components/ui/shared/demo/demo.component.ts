import { Component, ViewChild } from '@angular/core';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-demo',
  imports: [ConfirmationComponent,ButtonComponent,CardModule, ModalComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(ConfirmationComponent) confirmation!: ConfirmationComponent;

   abrirModal() {
     this.modal.open('Hola desde Certichain', 'Este es un modal de prueba.', () => {
       console.log('El modal fue cerrado');
     });
   }

   abrirConfirmacion(event: Event) {
     this.confirmation.showConfirm(event);
   }

}
