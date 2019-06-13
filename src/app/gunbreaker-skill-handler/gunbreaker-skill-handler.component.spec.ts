import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunbreakerSkillHandlerComponent } from './gunbreaker-skill-handler.component';

describe('GunbreakerSkillHandlerComponent', () => {
  let component: GunbreakerSkillHandlerComponent;
  let fixture: ComponentFixture<GunbreakerSkillHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunbreakerSkillHandlerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunbreakerSkillHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
