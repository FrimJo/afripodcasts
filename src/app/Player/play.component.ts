import {Component} from '@angular/core';
import {PlayerService} from "../Services/player.service";

@Component({
    selector: 'player',
    templateUrl: 'play.component.html',
    styleUrls: ['play.component.scss']
})

/*
 * A component for displaying a player and controller for current active episode
 */
export class PlayComponent {

    private _open = false; // Default start value for player

    get currentTimePercentage() { return this.playerService.currentTimePercentage; }
    get episodeNumber() {return this.playerService.episodeNumber; }
    get episodeTitle() {return this.playerService.episodeTitle; }
    get episodeDescription() {return this.playerService.episodeDescription; }

    constructor(private playerService:PlayerService) {}

    private hasEpisodeLoaded(): boolean { return this.playerService.hasEpisodeLoaded(); }
    private toggleOpen() { this._open = !this._open; }

    private isOpen(): boolean { return this._open; }

    // Play, pause and stop methods
    private playEpisode() { this.playerService.playCurrentEpisode(); }
    private pauseEpisode() { this.playerService.pauseCurrentEpisode(); }
    private stopEpisode() { this.playerService.stopCurrentEpisode(); }

    // Returns whether or not to show the play button
    private showPlayButton() { return this.playerService.isPaused() || this.playerService.isStopped(); }

    // Returns whether or not to show the pause button
    private showPauseButton() { return this.playerService.isPlaying(); }

    // Returns whether or not to show the stop button
    private showStopButton() { return this.playerService.isPlaying() || this.playerService.isPaused(); }

}
