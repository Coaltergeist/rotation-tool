import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/classlogic/interfaces';
import { player } from 'src/state';
import { gunbreakerStatusNames, gunbreakerDotNames } from 'src/classlogic/gunbreaker/enums';

@Component({
  selector: 'app-gunbreaker-status-handler',
  templateUrl: './gunbreaker-status-handler.component.html',
  styleUrls: ['./gunbreaker-status-handler.component.scss']
})
export class GunbreakerStatusHandlerComponent implements OnInit {
  public isActive: boolean;
  public icon: string;
  public cd: number;
  public cdTxt: string;
  public description: string

  @Input()
  public status: Status;

  constructor() {
    this.isActive = true;
    this.icon = '';
    this.cd = 0;
    this.description = '';
  }

  public setCdText() {
    if (this.cd < 0) {
      this.cd = 0;
    }
    this.cdTxt = this.cd.toFixed(0);
  }

  public ngOnInit() {
    switch (this.status.name) {
      case gunbreakerStatusNames.NO_MERCY:
        this.icon = 'no_mercy.png';
        break;
      case gunbreakerStatusNames.READY_TO_GOUGE:
        this.icon = 'eye_gouge.png';
        break;
      case gunbreakerStatusNames.READY_TO_RIP:
        this.icon = 'jugular_rip.png';
        break;
      case gunbreakerStatusNames.READY_TO_TEAR:
        this.icon = 'abdomen_tear.png';
        break;
      case gunbreakerDotNames.BOW_SHOCK:
        this.icon = 'bow_shock.png';
        break;
      case gunbreakerDotNames.SONIC_BREAK:
        this.icon = 'sonic_break.png';
        break;
    }

    this.description = player.statuses.get(this.status.name).description;

    this.isActive = true;
    this.cd = player.statuses.get(this.status.name).duration / 1000;
    if (this.status.isDot) {
      setInterval(() => {
        if (Date.now() - player.dots.get(this.status.name).startTime < player.statuses.get(this.status.name).duration) {
          this.isActive = true;
          this.cd -= .01;
          this.setCdText();
        } else {
          this.isActive = false;
        }
        if (this.cd <= 0) {
          this.cd = player.statuses.get(this.status.name).duration / 1000;
          this.setCdText();
        }
      }, 10);
    } else {
      setInterval(() => {
        this.isActive = player.activeStatuses.get(this.status.name);
        if (this.isActive) {
          this.cd -= .01;
          this.setCdText();
        }
        if (this.cd <= 0) {
          this.cd = player.statuses.get(this.status.name).duration / 1000;
          this.setCdText();
        }
      }, 10);
    }
  }

}
