import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalService } from './modal.service';
import { TestingModule } from '../../../testing/test-module';
import { ModalComponent } from '../../components/shared/modal/modal.component';

describe('ModalService', () => {
  let service: ModalService;
  let mockModalComponent: jasmine.SpyObj<ModalComponent>;

  beforeEach(() => {
    mockModalComponent = jasmine.createSpyObj('ModalComponent', ['open', 'openWithForm', 'close']);
    
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ModalService]
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a modal component', () => {
    service.register(mockModalComponent);

    const title = 'Test Modal';
    const content = 'This is a test';
    const onCloseSpy = jasmine.createSpy('onClose');
    
    service.show(title, content, onCloseSpy);
    
    expect(mockModalComponent.open).toHaveBeenCalledWith(title, content, onCloseSpy);
  });

  it('should show a form in the modal', () => {
    service.register(mockModalComponent);
    
    const testForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
    
    const title = 'Form Modal';
    const onSaveSpy = jasmine.createSpy('onSave');
    const onCloseSpy = jasmine.createSpy('onClose');
    
    service.showForm(title, testForm, onSaveSpy, onCloseSpy);

    expect(mockModalComponent.openWithForm).toHaveBeenCalledWith(title, testForm, onSaveSpy, onCloseSpy);
  });

  it('should close the modal', () => {
    service.register(mockModalComponent);
    service.close();
    
    expect(mockModalComponent.close).toHaveBeenCalled();
  });
});
