import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PodcastService} from "./Services/podcast.service";
import {AppRoutingModule} from "./app-routing.module";
import {PodcastsComponent} from "./Podcasts/podcasts.component";
import {EpisodesComponent} from "./Episodes/episodes.component";
import {PlayerService} from "./Services/player.service";
import {PlayComponent} from "./Player/play.component";

@NgModule({
  declarations: [
    AppComponent,
    PodcastsComponent,
    EpisodesComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PodcastService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
