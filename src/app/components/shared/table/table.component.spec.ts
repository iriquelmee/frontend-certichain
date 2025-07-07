import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockData = [
    { id: 1, name: 'Test 1', category: { id: 1, name: 'Category A' } },
    { id: 2, name: 'Test 2', category: { id: 2, name: 'Category B' } },
    { id: 3, name: 'Different', category: { id: 1, name: 'Category A' } },
    { id: 4, name: 'Another', category: { id: 3, name: 'Category C' } },
    { id: 5, name: 'Last Test', category: { id: 2, name: 'Category B' } }
  ];

  const mockColumns = [
    { header: 'ID', campo: 'id' },
    { header: 'Name', campo: 'name' },
    { header: 'Category', campo: 'category.name' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    component.columns = mockColumns;
    component.rows = 2;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all data', () => {
    expect(component.filteredData.length).toBe(mockData.length);
    expect(component.first).toBe(0);
  });

  it('should filter data based on search value', () => {
    component.searchValue = 'Test';
    component.filterData();
    
    expect(component.filteredData.length).toBe(3);
    expect(component.first).toBe(0);
  });

  it('should retrieve nested properties correctly', () => {
    const result = component.getCamposAnidados(mockData[0], 'category.name');
    expect(result).toBe('Category A');
  });

  it('should handle pagination correctly', () => {

    expect(component.isFirstPage()).toBeTrue();
    expect(component.isLastPage()).toBeFalse();
    component.next();

    expect(component.first).toBe(2);
    expect(component.isFirstPage()).toBeFalse();
    component.next();

    expect(component.first).toBe(4);
    expect(component.isLastPage()).toBeTrue();
    component.prev();

    expect(component.first).toBe(2);
    component.reset();

    expect(component.first).toBe(0);
    expect(component.isFirstPage()).toBeTrue();
  });

  it('should emit onPageChange event when page changes', () => {
    const spy = spyOn(component.onPageChange, 'emit');
    const mockEvent = { first: 2, rows: 2 };
    
    component.pageChange(mockEvent);
    
    expect(spy).toHaveBeenCalledWith(mockEvent);
    expect(component.first).toBe(2);
    expect(component.rows).toBe(2);
  });

  it('should handle label-prefixed fields', () => {
    component.label = 'item';
    
    const mockItem = { id: 1, name: 'Test' };
    const mockColField = 'item.name';
    
    component.columns = [...component.columns, { header: 'Item Name', campo: mockColField }];
    
    const extractedValue = component.getCamposAnidados(mockItem, 'name');
    expect(extractedValue).toBe('Test');
  });
});
