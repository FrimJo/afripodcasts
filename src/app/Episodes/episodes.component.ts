import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Episode} from "./episode";
import {PodcastService} from "../Services/podcast.service";
import {Podcast} from "../Podcasts/podcast";
import {PlayerService} from "../Services/player.service";
import {PlayState} from "../Services/playstate";
import 'rxjs/add/operator/map';

@Component({
    selector: 'episodes',
    templateUrl: 'episodes.component.html',
    styleUrls: ['episodes.component.scss']
})


/*
 * Lists all episodes for a specific podcast
 */
export class EpisodesComponent {

    private _id:string = '';
    private _image: string = '';
    private _title: string = 'loading…';
    private _author: string = 'loading…';
    private _showError:string;

    private _episodes:Episode[];

    private _selectedIndex:number;

    constructor(private route: ActivatedRoute,
                private podcastService:PodcastService,
                private router: Router,
                private playService: PlayerService){}

    private playEpisode(episode:Episode) { this.playService.loadAndPlayEpisode(episode); }

    /*
     * Check to see if a specific episode currently is playing
     */
    private hasPlayStatePlayForEpisode(episode: Episode): boolean {
        return this.playService.hasEpisodeWidthIDAndState(episode.id, PlayState.PLAY);
    }

    /*
     * Check to see if a specific episode currently is paused
     */
    private hasPlayStatePauseForEpisode(episode: Episode): boolean {
        return this.playService.hasEpisodeWidthIDAndState(episode.id, PlayState.PAUSE);
    }

    /*
     * When the close button is used, return to podcasts-view
     */
    private onClose(){ this.router.navigate(['']); }

    private handleError(error: any): Promise<any> {
        this._showError = 'Could not load episodes, check internet connection.';
        return Promise.reject(error.message || error);
    }

    /*
     * This life hook is run when the component has been initialized
     */
    ngOnInit(){

        // Get the podcast ID from the rout
        this.route.params.subscribe(params => {

            // Get current podcast using podcast ID
            this.podcastService.getPodcast(params['id']).then((podcast: Podcast) => {
                this._id = params['id'];
                this._image = podcast.image;
                this._title = podcast.title;
                this._author = podcast.author;
            }).catch(this.handleError.bind(this));

            // Use the podcast service to get all episodes for that podcast
            this.podcastService.getEpisodes(params['id']).then((episodes: Episode[]) => {

                // Sort the episode in ascending order by episode number
                episodes.sort((a, b) => a.number-b.number);

                // Save the episodes
                this._episodes = episodes
            }).catch(this.handleError.bind(this));

        });
    }

}
