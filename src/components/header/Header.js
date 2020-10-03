import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent{
    static className='excel__header header'
    constructor(root,options){
        super(root,{
            name:'Header',
            ...options
        })
    }
    toHTML() {
        return  `
        <div class="header__title" contenteditable>
                New sheet
            </div>
            <div class="header__buttons">
                <span><i class="fas fa-sign-out-alt"></i></span>
                <span><i class="fas fa-trash-alt"></i></span>
            </div>
        `
    }
}