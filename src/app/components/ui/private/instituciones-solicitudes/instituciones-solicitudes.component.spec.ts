import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionesSolicitudesComponent } from './instituciones-solicitudes.component';

describe('InstitucionesSolicitudesComponent', () => {
  let component: InstitucionesSolicitudesComponent;
  let fixture: ComponentFixture<InstitucionesSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionesSolicitudesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionesSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
