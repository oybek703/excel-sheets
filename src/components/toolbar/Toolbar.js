import {ExcelComponent} from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent{
    static className='excel__toolbar toolbar'
    constructor(root,options){
        super(root,{
            name:'Toolbar',
            listeners:[],
            ...options
        })
    }
    toHTML() {
        return  `
            <span><i class="fas fa-align-left"></i></span>
            <span><i class="fas fa-align-right"></i></span>
            <span><i class="fas fa-align-center"></i></span>
            <span><i class="fas fa-bold"></i></span>
            <span><i class="fas fa-italic"></i></span>
            <span><i class="fas fa-underline"></i></span>
        `
    }
}