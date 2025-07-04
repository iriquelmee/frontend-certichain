import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ToastService } from './toast.service';
import { TestingModule } from '../../../testing/test-module';

describe('ToastService', () => {
  let service: ToastService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        ToastService,
        { provide: MessageService, useValue: spy }
      ]
    });

    service = TestBed.inject(ToastService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display success message', () => {
    const summary = 'Operation successful';
    const detail = 'The operation was completed successfully';
    const life = 5000;

    service.success(summary, detail, life);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'success',
      summary,
      detail,
      life
    });
  });

  it('should display error message', () => {
    const summary = 'Operation failed';
    const detail = 'An error occurred';

    service.error(summary, detail);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary,
      detail,
      life: 3000
    });
  });

  it('should display info message', () => {
    const summary = 'Information';

    service.info(summary);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'info',
      summary,
      detail: undefined,
      life: 3000
    });
  });

  it('should display warning message', () => {
    const summary = 'Warning';
    const detail = 'This is a warning message';

    service.warning(summary, detail);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary,
      detail,
      life: 3000
    });
  });

  it('should clear all messages', () => {
    service.clear();
    expect(messageServiceSpy.clear).toHaveBeenCalled();
  });
});
