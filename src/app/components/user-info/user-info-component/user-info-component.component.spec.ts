import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponentComponent } from './user-info-component.component';

describe('UserInfoComponentComponent', () => {
  let component: UserInfoComponentComponent;
  let fixture: ComponentFixture<UserInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
