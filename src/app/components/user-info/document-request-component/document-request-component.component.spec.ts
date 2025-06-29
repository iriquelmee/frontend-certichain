import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequestComponentComponent } from './document-request-component.component';

describe('DocumentRequestComponentComponent', () => {
  let component: DocumentRequestComponentComponent;
  let fixture: ComponentFixture<DocumentRequestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentRequestComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentRequestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
