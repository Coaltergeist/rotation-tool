import { Component, Input, OnInit } from '@angular/core';
import { gunbreakerAbilities, gunbreakerSkills, gunbreakerStatuses, playerStatuses, enemyDots } from 'src/classlogic/gunbreaker/action_data';
import { Gunbreaker } from 'src/classlogic/gunbreaker/gunbreaker';
import { Ability, Skill, Status } from 'src/classlogic/interfaces';
import { initialize, player } from '../../state';

@Component({
  selector: 'app-gunbreaker-action-handler',
  templateUrl: './gunbreaker-action-handler.component.html',
  styleUrls: ['./gunbreaker-action-handler.component.scss'],
})
export class GunbreakerActionHandlerComponent implements OnInit {
  public powder: number;
  // public statuses: string;
  public combos: string;
  public skills: Skill[] = gunbreakerSkills;
  public abilities: Ability[] = gunbreakerAbilities;
  public statuses: Status[] = playerStatuses;
  public dots: Status[] = enemyDots;s

  public dps: string;
  // public dots: string;
  public mult: number;
  constructor() {
    this.powder = 0;
    // this.statuses = this.getStatuses();
    this.combos = this.getCombos();
    this.dps = '';
    // this.dots = this.getDots();
    this.mult = 1.0;
  }

  public onClick() {
    player.stopRotation();
    this.ngOnInit();
  }

  public toggleKeybindMode() {
    player.stopRotation();
    player.keyBindMode = !player.keyBindMode;
    this.ngOnInit();
  }

  public ngOnInit() {
    setInterval(() => {
      this.powder = player.getJobStacks();
      this.dps = player.dps.toFixed(2);
      // this.statuses = this.getStatuses();
      this.combos = this.getCombos();
      // this.dots = this.getDots();
      this.mult = player.damageMultiplier;
    }, 1000);
  }

  // public getStatuses(): string {
  //   let toReturn = '';
  //   player.activeStatuses.forEach((isActive, name) => {
  //     if (isActive) {
  //       toReturn += name + ', ';
  //     }
  //   });
  //   return toReturn;
  // }
  public getCombos(): string {
    let toReturn = '';
    player.getNextCombo().forEach((name) => {
      toReturn += name;
    });
    return toReturn;
  }
  // public getDots(): string {
  //   let toReturn = '';
  //   player.dots.forEach((dot, name) => {
  //     if (dot.startTime + dot.dot.duration > Date.now()) {
  //       toReturn += name + ', ';
  //     }
  //   });
  //   return toReturn;
  // }
}
