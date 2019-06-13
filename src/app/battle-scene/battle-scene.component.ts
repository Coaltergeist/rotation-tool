import { Component, OnInit } from '@angular/core';
import { enemyDots, playerStatuses } from 'src/classlogic/gunbreaker/action_data';
import { Status } from 'src/classlogic/interfaces';
import { player } from '../../state';

@Component({
  selector: 'app-battle-scene',
  templateUrl: './battle-scene.component.html',
  styleUrls: ['./battle-scene.component.scss'],
})
export class BattleSceneComponent implements OnInit {
  public imageName: string;
  public currentState: battleState;
  public statuses: Status[] = playerStatuses;
  public dots: Status[] = enemyDots;

  constructor() {
    this.imageName = 'base.png';
    this.currentState = battleState.BASE;
  }

  public setScene() {
    switch (player.getJobStacks()) {
      case 0:
        switch (this.currentState) {
          case battleState.BASE:
            this.imageName = 'base.png';
            break;
          case battleState.ATTACK:
            this.imageName = 'attack.png';
            break;
          case battleState.BUFF:
            this.imageName = 'buff.png';
            break;
        }
        break;
      case 1:
        switch (this.currentState) {
          case battleState.BASE:
            this.imageName = 'base_1_powder.png';
            break;
          case battleState.ATTACK:
            this.imageName = 'attack_1_powder.png';
            break;
          case battleState.BUFF:
            this.imageName = 'buff_1_powder.png';
            break;
        }
        break;
      case 2:
        switch (this.currentState) {
          case battleState.BASE:
            this.imageName = 'base_2_powder.png';
            break;
          case battleState.ATTACK:
            this.imageName = 'attack_2_powder.png';
            break;
          case battleState.BUFF:
            this.imageName = 'buff_2_powder.png';
            break;
        }
        break;
    }
  }

  public ngOnInit() {
    setInterval(() => {
      if (player.isAttacking) {
        this.currentState = battleState.ATTACK;
      } else if (player.isBuffing) {
        this.currentState = battleState.BUFF;
      } else {
        this.currentState = battleState.BASE;
      }
      this.setScene();
    }, 10);
  }
}

enum battleState {
  BASE = 'base',
  ATTACK = 'attack',
  BUFF = 'buff',
}
