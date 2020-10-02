import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent{
    constructor(root){
        super(root,{
            name:'Formula',
            listeners:['input']
        })
    }
    static className='excel__formula formula'
    toHTML() {
        return  `
            <div class="formula__sign">fx</div>
            <div class="formula__input" contenteditable></div>
        `
    }
    onInput(event){
        console.log(event.target)
    }
}