import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { SelectComponent } from '../../../shared/select/select.component';
import { ModalService } from '../../../../services/shared/modal.service';
import { UserInfo, userInfoData } from '../../../../../data';

@Component({
  selector: 'app-usuarios-informacion',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChipModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ModalComponent,
    SelectComponent
  ],
  templateUrl: './usuarios-informacion.component.html',
  styleUrl: './usuarios-informacion.component.scss'
})
export class UsuariosInformacionComponent implements OnInit {
  title: string = "Información";
  userData: UserInfo = { ...userInfoData };
  userForm!: FormGroup;
  
  userTypeOptions = [
    { label: 'Institución', value: 'institucion' },
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' }
  ];

  userSubTypeOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Usuario', value: 'user' },
  ];
  
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      Id: new FormControl({value: this.userData.Id, disabled: true}, Validators.required),
      UserID: new FormControl({value: this.userData.UserID, disabled: true}, Validators.required),
      UserTypeId: new FormControl(this.userData.UserTypeId, Validators.required),
      UserSubTypeId: new FormControl(this.userData.UserSubTypeId, Validators.required)
    });
  }

  openEditModal() {
    // Reset form with current user data
    this.userForm.setValue({
      Id: this.userData.Id,
      UserID: this.userData.UserID,
      UserTypeId: this.userData.UserTypeId,
      UserSubTypeId: this.userData.UserSubTypeId
    });

    this.modalService.showForm(
      'Editar Información de Usuario',
      this.userForm,
      (data) => this.saveUserData(data),
      () => console.log('Modal cerrado')
    );
  }

  saveUserData(data: UserInfo) {
    this.userData = { ...data };
    console.log('Datos guardados:', this.userData);
    // Aquí se integraría con la API para guardar los datos
  }
}
