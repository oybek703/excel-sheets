import {ActiveRouter} from "@core/router/ActiveRouter";

export class Page {
    constructor(){
        this.params=ActiveRouter.param || Date.now().toString()
    }
    getRoot(){
        throw new Error('getRoot method must be provided for each page!')
    }
    afterRender(){}
}