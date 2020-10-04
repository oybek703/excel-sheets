import {createToolbar} from "@/components/toolbar/toolbar_template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent{
    static className='excel__toolbar toolbar'
    constructor(root,options){
        super(root,{
            name:'Toolbar',
            listeners:['click'],
            subscribe:['currentStyles'],
            ...options
        })
    }
    get template() {
        return createToolbar(this.state)
    }
    prepare() {
        this.initState(defaultStyles)
    }
    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    toHTML() {
        return this.template
    }

    onClick(event){
        const target=$(event.target).closest('[data-type="button"]') || event.target
        if($(target).dataset.type==='button'){
            const value=JSON.parse($(target).dataset.value)
            this.$emit('toolbar:applystyle',value)
        }
    }
}