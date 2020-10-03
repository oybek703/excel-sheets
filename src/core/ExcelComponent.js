import {DOMListener} from "@core/DOMListener";
import {TableSelection} from "@core/TableSelection";

export class ExcelComponent extends DOMListener {
    constructor(root,options={}){
        super(root,options.listeners)
        this.name=options.name
        this.selection=new TableSelection()
        this.emitter=options.emitter
        this.unsubscribers=[]
        this.prepare()
    }
    prepare(){}
    toHTML(){
        return ''
    }
    init(){
        this.initDomListeners()
    }
    $emit(event,...args){
        this.emitter.emit(event,...args)
    }
    $on(event,fn){
        const unsub=this.emitter.subscribe(event,fn)
        this.unsubscribers.push(unsub)
    }
    destroy(){
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub=>unsub())
    }
}
