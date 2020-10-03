import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {preventDefault} from "@core/utils";

export class Formula extends ExcelComponent{
    constructor(root,options){
        super(root,{
            name:'Formula',
            listeners:['input','keydown'],
            ...options
        })
    }
    static className='excel__formula formula'
    toHTML() {
        return  `
            <div class="formula__sign">fx</div>
            <div class="formula__input" id="formula" contenteditable spellcheck="false"></div>
        `
    }
    init() {
        super.init();
        this.$on('table:select',cellText=>{
            $($(this.root).find('#formula')).text(cellText)
        })
    }

    onInput(event){
        const text=event.target.textContent.trim()
        this.$emit('formula:input',text)
    }
    onKeydown(event){
        const keys=['Enter','Tab']
        const {key}=event
        if(keys.includes(key)){
            preventDefault(event)
            this.$emit('formula:keydown')
        }
    }
}