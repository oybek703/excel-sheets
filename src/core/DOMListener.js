import {getEventName} from "@core/utils";
import {$} from "@core/dom";

export class DOMListener {
    constructor(root,listeners=[]){
        if(!root){
            throw new Error('root must be provided for DOMListener!')
        }
        this.root=root
        this.listeners=listeners
    }
    initDomListeners(){
        this.listeners.forEach(listener=>{
            const method=getEventName(listener)
            if(!this[method]){
                throw new Error(`${method} method  is not provided for ${this.name} Component`)
            }
            this[method]=this[method].bind(this)
            $(this.root).on(listener,this[method])
        })
    }
    removeDomListeners(){
        this.listeners.forEach(listener=>{
            const method=getEventName(listener)
            $(this.root).off(listener,this[method])
        })
    }
}

