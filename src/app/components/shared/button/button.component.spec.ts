import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.setIcon();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default label when no label is provided', () => {
    expect(component.label).toBe('Botón');
  });

  it('should set a custom label', () => {
    component.label = 'Test Button';
    fixture.detectChanges();
    expect(component.label).toBe('Test Button');
  });

  it('should have default type as primary', () => {
    expect(component.type).toBe('primary');
  });

  it('should use default icon based on type', () => {
    expect(component.iconToShow).toBe('pi pi-check');
    
    component.type = 'warning';
    component.ngOnChanges({
      type: {
        currentValue: 'warning',
        previousValue: 'primary',
        firstChange: false,
        isFirstChange: () => false
      }
    });
    
    expect(component.iconToShow).toBe('pi pi-exclamation-triangle');
  });

  it('should prioritize custom icon over type-based icon', () => {
    component.icon = 'pi pi-custom-icon';
    component.setIcon();
    
    expect(component.iconToShow).toBe('pi pi-custom-icon');
  });

  it('should emit onClick event when clicked', () => {
    const spy = spyOn(component.onClick, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should be disabled when disabled property is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });
});
