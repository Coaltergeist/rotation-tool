import { Component, HostListener, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { gunbreakerAbilities } from 'src/classlogic/gunbreaker/action_data';
import { gunbreakerActionNames, gunbreakerStatusNames } from 'src/classlogic/gunbreaker/enums';
import { Ability, KeyBind } from 'src/classlogic/interfaces';
import { player } from '../../state';

@Component({
  selector: 'app-gunbreaker-ability-handler',
  templateUrl: './gunbreaker-ability-handler.component.html',
  styleUrls: ['./gunbreaker-ability-handler.component.scss'],
})
export class GunbreakerAbilityHandlerComponent implements OnInit {
  public cd: number;
  public cdTxt: string;
  public started: boolean;
  public isVisible: boolean;
  public icon: string;
  public isUsable: boolean;
  public isCombo: boolean;
  public description: string;
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
  public ability: Ability;

  constructor() {
    this.cd = 0.00;
    this.cdTxt = '';
    this.started = false;
    this.isVisible = true;
    this.icon = '';
    this.isUsable = true;
    this.isCombo = false;
    this.description = '';
    this.isBound = false;
    this.keyBindMode = false;
    this.startBinding = false;
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
      console.log(event);
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
    if (this.ability.name !== gunbreakerActionNames.CONTINUATION) {
      player.executeAction(this.ability.name);
      if (this.ability.name === gunbreakerActionNames.JUGULAR_RIP ||
          this.ability.name === gunbreakerActionNames.ABDOMEN_TEAR ||
          this.ability.name === gunbreakerActionNames.EYE_GOUGE) {
        this.ability.name = gunbreakerActionNames.CONTINUATION;
        this.icon = 'continuation.png';
        this.description = player.abilities.get(gunbreakerActionNames.CONTINUATION).description;
      }
    }
  }

  public onClick() {
    if (!this.keyBindMode) {
      this.useAction();
    } else {
      if (player.bindingAction === this.ability.name) {
        player.bindingAction = '';
      } else {
        player.bindingAction = this.ability.name;
      }
    }
  }

  public setCdText() {
    if (this.cd < 0) {
      this.cd = 0;
    }
    this.cdTxt = this.cd.toFixed(1);
    if (player.abilities.get(this.ability.name).recast === player.abilities.get(this.ability.name).cd) {
      this.cdTxt = '';
    }
  }

  public ngOnInit() {
    this.keybindName = '__________';
    this.keybind.isSet = false;
    this.isBound = false;
    this.keyBindMode = false;
    this.description = player.abilities.get(this.ability.name).description;
    this.cd = player.abilities.get(this.ability.name).cd;
    player.abilities.get(this.ability.name).cd = player.abilities.get(this.ability.name).recast;
    this.setCdText();
    this.isVisible = this.ability.isVisible;

    switch (this.ability.name) {
      case gunbreakerActionNames.CONTINUATION:
        this.icon = 'continuation.png';
        break;
      case gunbreakerActionNames.NO_MERCY:
        this.icon = 'no_mercy.png';
        break;
      case gunbreakerActionNames.BLOODFEST:
        this.icon = 'bloodfest.png';
        break;
      case gunbreakerActionNames.ROUGH_DIVIDE:
        this.icon = 'rough_divide.png';
        break;
      case gunbreakerActionNames.BOW_SHOCK:
        this.icon = 'bow_shock.png';
        break;
      case gunbreakerActionNames.BLASTING_ZONE:
        this.icon = 'blasting_zone.png';
        break;
    }

    const timer = setInterval(() => {
      this.cd = player.abilities.get(this.ability.name).cd;
      this.isUsable = player.actionUsable(this.ability.name);
      this.setCdText();
      if (player.keyBindMode) {
        this.keyBindMode = true;
      } else {
        this.keyBindMode = false;
      }
      if (player.bindingAction === this.ability.name) {
        this.startBinding = true;
      } else {
        this.startBinding = false;
      }
    }, 10);

    if (this.ability.name === gunbreakerActionNames.CONTINUATION) {
      setInterval(() => {
        if (player.activeStatuses.get(gunbreakerStatusNames.READY_TO_RIP)) {
          this.ability.name = gunbreakerActionNames.JUGULAR_RIP;
          this.icon = 'jugular_rip.png';
          this.description = player.abilities.get(gunbreakerActionNames.JUGULAR_RIP).description;
          this.isCombo = true;
        } else if (player.activeStatuses.get(gunbreakerStatusNames.READY_TO_TEAR)) {
          this.ability.name = gunbreakerActionNames.ABDOMEN_TEAR;
          this.icon = 'abdomen_tear.png';
          this.description = player.abilities.get(gunbreakerActionNames.ABDOMEN_TEAR).description;
          this.isCombo = true;
        } else if (player.activeStatuses.get(gunbreakerStatusNames.READY_TO_GOUGE)) {
          this.ability.name = gunbreakerActionNames.EYE_GOUGE;
          this.icon = 'eye_gouge.png';
          this.description = player.abilities.get(gunbreakerActionNames.EYE_GOUGE).description;
          this.isCombo = true;
        } else {
          this.isCombo = false;
        }
      }, 10);
    }
  }
}
