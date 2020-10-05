import {$} from "@core/dom";
import {ActiveRouter} from "@core/router/ActiveRouter";
import {Loader} from "@/components/Loader";

export class Router {
    constructor(selector,routes){
        this.root=document.querySelector(selector)
        this.routes=routes
        this.loader=new Loader()
        this.page=null
        this.changePageHandler=this.changePageHandler.bind(this)
        this.init()
    }
    init(){
        window.addEventListener('hashchange',this.changePageHandler)
        this.changePageHandler()
    }
    async changePageHandler(){
        $(this.root).clear().append(this.loader)
        if(this.page){
            this.page.destroy()
        }
        const path=ActiveRouter.path
        const Page=path.startsWith('excel') ?  this.routes.excel : this.routes.dashboard
        this.page=new Page(ActiveRouter.param)
        const html= await this.page.getRoot()
        $(this.root).clear().append(html)
        this.page.afterRender()
    }
    destroy(){
        this.page.destroy()
        window.removeEventListener('hashchange',this.changePageHandler)
    }
}