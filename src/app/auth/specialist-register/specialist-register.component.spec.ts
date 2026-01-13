import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistRegisterComponent } from './specialist-register.component';

describe('SpecialistRegisterComponent', () => {
  let component: SpecialistRegisterComponent;
  let fixture: ComponentFixture<SpecialistRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialistRegisterComponent]
    });
    fixture = TestBed.createComponent(SpecialistRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
