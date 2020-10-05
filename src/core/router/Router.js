import {$} from "@core/dom";
import {ActiveRouter} from "@core/router/ActiveRouter";

export class Router {
    constructor(selector,routes){
        this.root=document.querySelector(selector)
        this.routes=routes
        this.page=null
        this.changePageHandler=this.changePageHandler.bind(this)
        this.init()
    }
    init(){
        window.addEventListener('hashchange',this.changePageHandler)
        this.changePageHandler()
    }
    changePageHandler(){
        if(this.page){
            this.page.destroy()
        }
        const path=ActiveRouter.path
        const Page=path.startsWith('excel') ?  this.routes.excel : this.routes.dashboard
        this.page=new Page(ActiveRouter.param)
        $(this.root).clear().append(this.page.getRoot())
        this.page.afterRender()
    }
    destroy(){
        this.page.destroy()
        window.removeEventListener('hashchange',this.changePageHandler)
    }
}