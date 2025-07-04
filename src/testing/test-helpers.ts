import { Component, NgModule, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';

export function mockService<T>(service: any, methods: Record<string, any>): T {
  const mock = jasmine.createSpyObj(service.name, Object.keys(methods));
  
  Object.entries(methods).forEach(([method, returnValue]) => {
    if (returnValue instanceof Observable || returnValue === of()) {
      mock[method].and.returnValue(returnValue);
    } 
    else {
      mock[method].and.returnValue(of(returnValue));
    }
  });
  
  return mock as T;
}

export function createMockComponent(selector: string, template: string = ''): any {
  @Component({
    selector,
    template
  })
  class MockComponent {}
  
  return MockComponent;
}

export function createMockModule(components: any[] = [], providers: Provider[] = []): any {
  @NgModule({
    declarations: [...components],
    exports: [...components],
    providers: [...providers]
  })
  class MockModule {}
  
  return MockModule;
}

export const mockObservables = {
  success: <T>(data: T) => of(data),
  error: <T>(error: any) => new Observable<T>(subscriber => {
    subscriber.error(error);
  })
};
