import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCheckComponent } from './role-check.component';

describe('RoleCheckComponent', () => {
  let component: RoleCheckComponent;
  let fixture: ComponentFixture<RoleCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleCheckComponent]
    });
    fixture = TestBed.createComponent(RoleCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
