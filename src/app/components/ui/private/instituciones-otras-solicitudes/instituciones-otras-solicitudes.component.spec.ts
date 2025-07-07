import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionesOtrasSolicitudesComponent } from './instituciones-otras-solicitudes.component';
import { TestingModule } from '../../../../../testing/test-module';

describe('InstitucionesOtrasSolicitudesComponent', () => {
  let component: InstitucionesOtrasSolicitudesComponent;
  let fixture: ComponentFixture<InstitucionesOtrasSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionesOtrasSolicitudesComponent, TestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionesOtrasSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
