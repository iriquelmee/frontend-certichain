import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuariosComponent } from './admin-usuarios.component';
import { TestingModule } from '../../../../../testing/test-module';

describe('AdminUsuariosComponent', () => {
  let component: AdminUsuariosComponent;
  let fixture: ComponentFixture<AdminUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsuariosComponent, TestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
