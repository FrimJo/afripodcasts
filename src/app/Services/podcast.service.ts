import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Episode} from "../Episodes/episode";
import {Podcast} from "../Podcasts/podcast";
import 'rxjs/add/operator/toPromise';

/*
 * A podcast service for consuming RESTful API from
 * http://afripods-stage.herokuapp.com/
 *
 * Documentation can be found at http://afripods-stage.herokuapp.com/docs/
 */

@Injectable()
export class PodcastService {

    private static readonly URL = 'http://afripods-stage.herokuapp.com';

    constructor(private http:Http ) { }

    /*
    * A getter for fetching all available podcasts, returns a promise
    */
    getPodcasts():Promise<Podcast[]> {

        return this.http.get(`${PodcastService.URL}/podcasts`)
        .toPromise()
        .then(response => {
            return response.json().data.map(data => {
                const podcast = new Podcast();
                podcast.id = data['id'];
                podcast.title = data['title'];
                podcast.image = data['image_main'];
                podcast.author = data['author']['name'];
                return podcast;
            });
        })
        .catch(this.handleError);
    }

    /*
     * A getter for fetching a specific podcast, returns a promise
     */
    getPodcast(podcastId: number):Promise<Podcast> {

        return this.http.get(`${PodcastService.URL}/podcasts/${podcastId}`)
        .toPromise()
        .then(response => {
            const data = response.json().data
            const podcast = new Podcast();
            podcast.id = data['id'];
            podcast.title = data['title'];
            podcast.image = data['image_main'];
            podcast.author = data['author']['name'];
            return podcast;
        })
        .catch(this.handleError);
    }

    /*
     * A getter for fetching a specific podcast, returns a promise
     */
    getEpisodes(podcastId: number):Promise<Episode[]> {

        return this.http.get(`${PodcastService.URL}/podcasts/${podcastId}/episodes`)
        .toPromise()
        .then(response => {
            return response.json().data.map(data => {

                const episode = new Episode();
                episode.id = data['id'];
                episode.title = data['title'];
                episode.author = data['author']['name'];
                episode.number = data['number'];
                episode.duration = data['duration'];
                episode.description = data['short_description'];
                return episode;
            });
        })
        .catch(this.handleError);
    }

    /*
     * A getter for fetching a specific Episode, returns a promise
     */
    getEpisode(episodeId: string):Promise<Episode> {

        return this.http.get(`${PodcastService.URL}/episodes/${episodeId}`)
        .toPromise()
        .then(response => {
            const data = response.json().data;
            const episode = new Episode();
            episode.id = data['id'];
            episode.title = data['title'];
            episode.author = data['author']['name'];
            episode.number = data['number'];
            episode.url = data['streamUrl'];
            episode.duration = data['duration'];
            episode.description = data['short_description'];
            return episode;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
