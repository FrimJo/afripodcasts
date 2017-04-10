import {Injectable} from '@angular/core';
import {Episode} from "../Episodes/episode";
import {PodcastService} from "./podcast.service";
import {PlayState} from "./playstate";

/*
 * This service tracks the current audio and controlls the stop, play, and pause.
 */
@Injectable()
export class PlayerService {

    private _audioPlayer = new Audio();
    private _tempTime = Date.now();
    private _currentEpisode: Episode;

    get episodeNumber(): number { return this._currentEpisode.number; };
    get episodeTitle(): string { return this._currentEpisode.title; };
    get episodeDescription(): string { return this._currentEpisode.description; };
    get currentTimePercentage(): number { return this._currentEpisode.currentTime/this._currentEpisode.duration * 100; }

    constructor(private podcastService: PodcastService) {

        // Register listener for on play
        this._audioPlayer.onplay = () => { this._currentEpisode.playState = PlayState.PLAY; };

        // Register listener for on pause
        this._audioPlayer.onpause = () => { this._currentEpisode.playState = PlayState.PAUSE; };

        // Register listener for when the the playback of the audio has ended
        this._audioPlayer.onended = () => { this.removeCurrentEpisode(); };

        // Register listener for when the current playback position has changed
        this._audioPlayer.ontimeupdate   = () => {

            // If it has passed more than one second
            if(Date.now() - this._tempTime > 1000) {

                // Get current time from audio element, floor it to closest whole second
                this._currentEpisode.currentTime = Math.floor(this._audioPlayer.currentTime);

                // Update with current time
                this._tempTime = Date.now();
            }

        };
    }

    /*
     * Removes the current episode from currently playing.
     */
    private removeCurrentEpisode() {

        // Stop the current episode if there is any which is not stopped
        if(this._currentEpisode && this._currentEpisode.playState != PlayState.STOP) this._currentEpisode.playState = PlayState.STOP;

        // Remove the current episode
        this._currentEpisode = null;
    }

    isPlaying() { return this._currentEpisode.playState == PlayState.PLAY; }
    isPaused() { return this._currentEpisode.playState == PlayState.PAUSE; }
    isStopped(){ return this._currentEpisode.playState == PlayState.STOP; }

    /*
     * Checks if current active episode has same id as provided episode id, and returns whether
     * it has provided state.
     */
    hasEpisodeWidthIDAndState(episodeId: string, state: PlayState) {

        if(!this._currentEpisode || this._currentEpisode.id !== episodeId ) return false;
        return this._currentEpisode.playState == state;
    }

    hasEpisodeLoaded() { return this._currentEpisode != null; }

    playCurrentEpisode() { this._audioPlayer.play(); }
    pauseCurrentEpisode() { this._audioPlayer.pause(); }
    stopCurrentEpisode() { this._audioPlayer.currentTime = this._audioPlayer.duration; }

    /*
     * Load a new episode and play it when ready.
     */
    loadAndPlayEpisode(episode: Episode) {

        // Remove current episode
        this.removeCurrentEpisode();

        // Set new episode for playback
        this._currentEpisode = episode;

        // Get the url for active episode
        this.podcastService.getEpisode(episode.id).then((ep:Episode) => {

            this._audioPlayer.src = ep.url;
            this._audioPlayer.load();
            this.playCurrentEpisode();

        });
    }

}
