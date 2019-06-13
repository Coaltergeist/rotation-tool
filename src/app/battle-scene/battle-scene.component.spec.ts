import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSceneComponent } from './battle-scene.component';

describe('BattleSceneComponent', () => {
  let component: BattleSceneComponent;
  let fixture: ComponentFixture<BattleSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleSceneComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
