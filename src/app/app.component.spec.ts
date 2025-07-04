import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TestingModule } from '../testing/test-module';
import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  template: '<div>Mock Sidebar</div>',
  standalone: true
})
class MockSidebarComponent {}

const authServiceMock = {
  currentUser: { id: '1', username: 'test' },
  authState$: of({ user: { isAuthenticated: true } })
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule,AppComponent,RouterOutlet, CardModule,ToastModule, CommonModule,MockSidebarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'certichain' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('certichain');
  });

  it('should initialize isAuthenticated property', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isAuthenticated).toBeDefined();
  });
});
