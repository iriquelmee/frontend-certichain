import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export class RouterTestingHelpers {
  
  static getMockRouter(): jasmine.SpyObj<Router> {
    return jasmine.createSpyObj<Router>('Router', [
      'navigate', 
      'navigateByUrl', 
      'parseUrl', 
      'createUrlTree'
    ]);
  }

  static getMockLocation(): jasmine.SpyObj<Location> {
    return jasmine.createSpyObj<Location>('Location', [
      'back', 
      'forward', 
      'go', 
      'prepareExternalUrl', 
      'path'
    ]);
  }

  static parseUrl(router: Router, url: string) {
    return router.parseUrl(url);
  }
}

export function createServiceMock<T>(type: Type<T>, methods: string[]): jasmine.SpyObj<T> {
  return jasmine.createSpyObj(type.name, methods);
}
