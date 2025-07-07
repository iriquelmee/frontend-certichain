import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent,CommonModule,FormsModule,DropdownModule,NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set options correctly', () => {
    const testOptions = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 }
    ];
    component.options = testOptions;
    fixture.detectChanges();
    expect(component.options).toEqual(testOptions);
  });

  it('should implement ControlValueAccessor methods', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');

    const mockFn = jasmine.createSpy('mockFn');
    component.registerOnChange(mockFn);
    component.onChange('test');
    expect(mockFn).toHaveBeenCalledWith('test');

    const touchFn = jasmine.createSpy('touchFn');
    component.registerOnTouched(touchFn);
    component.onTouched();
    expect(touchFn).toHaveBeenCalled();

    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should call onChange and onTouched when selection changes', () => {
    spyOn(component, 'onChange');
    spyOn(component, 'onTouched');
    
    const mockEvent = { value: 'test-value' };
    component.onSelectionChange(mockEvent);
    
    expect(component.value).toBe('test-value');
    expect(component.onChange).toHaveBeenCalledWith('test-value');
    expect(component.onTouched).toHaveBeenCalled();
  });
});
