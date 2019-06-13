import { Component, HostListener, Input, OnInit } from '@angular/core';
import { gunbreakerActionNames } from 'src/classlogic/gunbreaker/enums';
import { KeyBind, Skill } from 'src/classlogic/interfaces';
import { player } from '../../state';

@Component({
  selector: 'app-gunbreaker-skill-handler',
  templateUrl: './gunbreaker-skill-handler.component.html',
  styleUrls: ['./gunbreaker-skill-handler.component.scss'],
})
export class GunbreakerSkillHandlerComponent implements OnInit {
  public cd: number;
  public cdTxt: string;
  public started: boolean;
  public isOnSpecialCd: boolean;
  public icon: string;
  public isUsable: boolean;
  public isCombo: boolean;
  public description: string;
  public name: string;

  public isBound: boolean;
  public keyBindMode: boolean;
  public startBinding: boolean;
  public keybindName: string;
  public keybind: KeyBind = {
    altMod: false,
    ctrlMod: false,
    isSet: false,
    key: 0,
    name: '',
    shiftMod: false,
  };

  @Input()
  public skill: Skill;

  constructor() {
    this.cd = 0.00;
    this.cdTxt = '';
    this.started = false;
    this.isOnSpecialCd = false;
    this.icon = '';
    this.isUsable = true;
    this.isCombo = false;
    this.description = '';
    this.name = '';
    this.isBound = false;
    this.keyBindMode = false;
    this.startBinding = false;
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
      if (this.keyBindMode && this.startBinding) {
        this.keybind.name = '';
        if (event.shiftKey) {
          this.keybind.shiftMod = true;
          this.keybind.name += '^+';
        } else {
          this.keybind.shiftMod = false;
        }
        if (event.ctrlKey) {
          this.keybind.ctrlMod = true;
          this.keybind.name += 'ctrl+';
        } else {
          this.keybind.ctrlMod = false;
        }
        if (event.altKey) {
          this.keybind.altMod = true;
          this.keybind.name += 'alt+';
        } else {
          this.keybind.altMod = false;
        }
        if (event.keyCode > 95 && event.keyCode < 106) {
          this.keybind.name += 'N';
        }
        if (event.key === 'ArrowLeft') {
          this.keybind.name += 'Left';
        } else if (event.key === 'ArrowRight') {
          this.keybind.name += 'Right';
        } else if (event.key === 'ArrowDown') {
          this.keybind.name += 'Down';
        } else if (event.key === 'ArrowUp') {
          this.keybind.name += 'Up';
        } else if (event.key === 'PageDown') {
          this.keybind.name += 'PgDown';
        } else if (event.key === 'PageUp') {
          this.keybind.name += 'PgUp';
        } else {
          this.keybind.name += event.key;
        }
        this.keybindName = this.keybind.name;
        this.keybind.key = event.keyCode;
        this.keybind.isSet = true;
        this.isBound = true;
        player.bindingAction = '';
      }
      if (this.keybind.altMod === event.altKey &&
          this.keybind.shiftMod === event.shiftKey &&
          this.keybind.ctrlMod === event.ctrlKey &&
          this.keybind.key === event.keyCode &&
          this.keybind.isSet) {
        if (!this.keyBindMode) {
          this.useAction();
        }
      }
    }
  }

  public useAction() {
    if (!player.started) {
      player.startRotation();
    }
    if (!player.isOnGcd()) {
      player.executeAction(this.skill.name);
    } else if (this.cd < 1) {
      player.nextSkill = this.skill.name;
      player.queueTime = Date.now();
    }
  }

  public onClick() {
    if (!this.keyBindMode) {
      this.useAction();
    } else {
      if (player.bindingAction === this.skill.name) {
        player.bindingAction = '';
      } else {
        player.bindingAction = this.skill.name;
      }
    }
  }

  public setCdText() {
    if (this.cd < 0) {
      this.cd = 0;
    }
    this.cdTxt = this.cd.toFixed(1);
    if (this.cd === player.skills.get(this.skill.name).recast) {
      this.cdTxt = '';
    }
  }

  public ngOnInit() {
    this.keybindName = '__________';
    this.name = this.skill.name;
    this.isBound = false;
    this.description = player.skills.get(this.skill.name).description;
    this.cd = player.skills.get(this.skill.name).cd;
    player.skills.get(this.skill.name).cd = player.skills.get(this.skill.name).recast;
    this.setCdText();

    switch (this.skill.name) {
      case gunbreakerActionNames.KEEN_EDGE:
        this.icon = 'keen_edge.png';
        break;
      case gunbreakerActionNames.BRUTAL_SHELL:
        this.icon = 'brutal_shell.png';
        break;
      case gunbreakerActionNames.SOLID_BARREL:
        this.icon = 'solid_barrel.png';
        break;
      case gunbreakerActionNames.GNASHING_FANG:
        this.icon = 'gnashing_fang.png';
        break;
      case gunbreakerActionNames.SAVAGE_CLAW:
        this.icon = 'savage_claw.png';
        break;
      case gunbreakerActionNames.WICKED_TALON:
        this.icon = 'wicked_talon.png';
        break;
      case gunbreakerActionNames.BURST_STRIKE:
        this.icon = 'burst_strike.png';
        break;
      case gunbreakerActionNames.SONIC_BREAK:
        this.icon = 'sonic_break.png';
        break;
      case gunbreakerActionNames.DEMON_SLAUGHTER:
        this.icon = 'demon_slaughter.png';
        break;
      case gunbreakerActionNames.DEMON_SLICE:
        this.icon = 'demon_slice.png';
        break;
      case gunbreakerActionNames.FATED_CIRCLE:
        this.icon = 'fated_circle.png';
        break;
      case gunbreakerActionNames.LIGHTNING_SHOT:
        this.icon = 'lightning_shot.png';
        break;
    }

    setInterval(() => {
      this.cd = player.skills.get(this.skill.name).cd;
      this.setCdText();
      this.isUsable = player.actionUsable(this.skill.name);
      if (player.getNextCombo().includes(this.skill.name)) {
        this.isCombo = true;
      } else {
        this.isCombo = false;
      }
      if (player.keyBindMode) {
        this.keyBindMode = true;
      } else {
        this.keyBindMode = false;
      }
      if (player.bindingAction === this.skill.name) {
        this.startBinding = true;
      } else {
        this.startBinding = false;
      }
    }, 10);
  }
}
