import { HttpClientModule } from '@angular/common/http';
import { Statement } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BattleSceneComponent } from './battle-scene/battle-scene.component';
import { GunbreakerAbilityHandlerComponent } from './gunbreaker-ability-handler/gunbreaker-ability-handler.component';
import { GunbreakerActionHandlerComponent } from './gunbreaker-action-handler/gunbreaker-action-handler.component';
import { GunbreakerSkillHandlerComponent } from './gunbreaker-skill-handler/gunbreaker-skill-handler.component';
import { GunbreakerStatusHandlerComponent } from './gunbreaker-status-handler/gunbreaker-status-handler.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GunbreakerActionHandlerComponent,
    GunbreakerAbilityHandlerComponent,
    GunbreakerSkillHandlerComponent,
    BattleSceneComponent,
    GunbreakerStatusHandlerComponent,
    NavbarComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
