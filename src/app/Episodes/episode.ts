
import {PlayState} from "../Services/playstate";
export class Episode {

    id: string;
    title: string = 'Loading…';
    url: string;
    author: string;
    number: number;
    description: string;
    duration: number;
    currentTime: number = 0;
    playState: PlayState = PlayState.STOP;


}