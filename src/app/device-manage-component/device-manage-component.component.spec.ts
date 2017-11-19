import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManageComponentComponent } from './device-manage-component.component';

describe('DeviceManageComponentComponent', () => {
  let component: DeviceManageComponentComponent;
  let fixture: ComponentFixture<DeviceManageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceManageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
