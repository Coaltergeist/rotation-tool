import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunbreakerStatusHandlerComponent } from './gunbreaker-status-handler.component';

describe('GunbreakerStatusHandlerComponent', () => {
  let component: GunbreakerStatusHandlerComponent;
  let fixture: ComponentFixture<GunbreakerStatusHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunbreakerStatusHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunbreakerStatusHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
