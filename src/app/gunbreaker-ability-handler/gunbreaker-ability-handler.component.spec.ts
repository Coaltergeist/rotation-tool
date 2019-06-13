import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunbreakerAbilityHandlerComponent } from './gunbreaker-ability-handler.component';

describe('GunbreakerAbilityHandlerComponent', () => {
  let component: GunbreakerAbilityHandlerComponent;
  let fixture: ComponentFixture<GunbreakerAbilityHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunbreakerAbilityHandlerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunbreakerAbilityHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
