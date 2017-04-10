import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PodcastsComponent} from "./Podcasts/podcasts.component";
import {EpisodesComponent} from "./Episodes/episodes.component";


const routes: Routes = [
    { path: '', component: PodcastsComponent },
    { path: 'podcast/:id', component: EpisodesComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}