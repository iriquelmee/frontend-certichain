import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionesComponent } from './instituciones.component';
import { TestingModule } from '../../../../../testing/test-module';

describe('InstitucionesComponent', () => {
  let component: InstitucionesComponent;
  let fixture: ComponentFixture<InstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionesComponent, TestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
