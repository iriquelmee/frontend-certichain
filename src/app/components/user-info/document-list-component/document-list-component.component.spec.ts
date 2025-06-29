import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListComponentComponent } from './document-list-component.component';

describe('DocumentListComponentComponent', () => {
  let component: DocumentListComponentComponent;
  let fixture: ComponentFixture<DocumentListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
