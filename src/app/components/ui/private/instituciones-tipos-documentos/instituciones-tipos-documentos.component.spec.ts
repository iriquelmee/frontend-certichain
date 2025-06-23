import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionesTiposDocumentosComponent } from './instituciones-tipos-documentos.component';

describe('InstitucionesTiposDocumentosComponent', () => {
  let component: InstitucionesTiposDocumentosComponent;
  let fixture: ComponentFixture<InstitucionesTiposDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionesTiposDocumentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionesTiposDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
