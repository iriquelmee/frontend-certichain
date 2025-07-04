import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { TestingModule } from '../../../../../testing/test-module';
import { CardModule } from 'primeng/card';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminComponent, 
        TestingModule,
        CardModule
      ],
      providers: [
      ]
    })
    .compileComponents();

    // Mock para tabsAdmin si es necesario
    (window as any).tabsAdmin = [];

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
