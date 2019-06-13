import { Component, OnInit } from '@angular/core';
import { player } from 'src/state';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponentComponent implements OnInit {
  public dps: number;
  public totalTime: number;
  public dpsTxt: string;
  public timeTxt: string;
  public keybindMode: boolean;

  constructor() {
    this.dps = 0.0;
    this.totalTime = 0.0;
    this.dpsTxt = '';
    this.timeTxt = '';
  }

  public ngOnInit() {
    this.dps = 0.0;
    this.totalTime = 0.0;
    this.formatText();

    setInterval(() => {
      this.dps = player.dps;
      this.totalTime = player.totalTime / 1000;
      this.formatText();
    }, 1000);
  }

  public formatText() {
    this.dpsTxt = this.dps.toFixed(1);
    this.timeTxt = this.totalTime.toFixed(1);
  }

  public onClick() {
    player.stopRotation();
    this.ngOnInit();
  }

  public keybind() {
    player.stopRotation();
    player.keyBindMode = !player.keyBindMode;
    this.ngOnInit();
  }

}
