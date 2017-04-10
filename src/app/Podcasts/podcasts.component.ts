import {Component} from '@angular/core';
import {PodcastService} from "../Services/podcast.service";
import {Podcast} from "./podcast";
import {Router} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'podcasts',
    templateUrl: 'podcasts.component.html',
    styleUrls: ['podcasts.component.scss']
})

/*
 * Lists all podcasts.
 */
export class PodcastsComponent {

    private _podcasts:Podcast[];
    private _showError:string;

    constructor(private podcastService:PodcastService, private router: Router){}

    private loadPodcasts(): void {
        this.podcastService.getPodcasts().then(podcasts => this._podcasts = podcasts).catch(this.handleError.bind(this));
    }

    private goToPodcast(podcast: Podcast): void { this.router.navigate(['/podcast', podcast.id]); }

    private handleError(error: any): Promise<any> {
        this._showError = 'Could not load podcasts, check internet connection.';
        return Promise.reject(error.message || error);
    }

    /*
     * This life hook is run when the component has been initialized
     */
    ngOnInit(){

        // Load all podcasts
        this.loadPodcasts();
    }


}
