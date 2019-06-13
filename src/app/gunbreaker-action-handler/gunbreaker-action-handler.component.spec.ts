import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunbreakerActionHandlerComponent } from './gunbreaker-action-handler.component';

describe('GunbreakerActionHandlerComponent', () => {
  let component: GunbreakerActionHandlerComponent;
  let fixture: ComponentFixture<GunbreakerActionHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunbreakerActionHandlerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunbreakerActionHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
