import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";
import {StoreSubscriber} from "@core/StoreSubscriber";

export class Excel {
    constructor(selector,options){
       this.el=document.querySelector(selector)
       this.components=options.components||[]
        this.emitter=new Emitter()
        this.store=options.store
        this.storesubscriber=new StoreSubscriber(this.store)
    }
    getRoot(){
        const root=$.create('div','excel')
        const componentOptions={
            emitter:this.emitter,
            store:this.store
        }
        this.components=this.components.map(Component=>{
            const el=$.create('div')
            $(el).setClass(Component.className)
            const component=new Component(el,componentOptions)
            $(el).html(component.toHTML())
            root.append(el)
            return component
        })
        return root
    }
    render(){
        this.el.append(this.getRoot())
        this.storesubscriber.subscribeComponents(this.components)
        this.components.forEach(component=>component.init())
    }
    destroy(){
        this.storesubscriber.unsubscribeComponents()
        this.components.forEach(component=>component.destroy())
    }
}
