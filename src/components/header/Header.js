import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent{
    static className='excel__header header'
    constructor(root,options){
        super(root,{
            name:'Header',
            listeners:['input'],
            ...options
        })
    }
    prepare() {
        this.onInput=debounce(this.onInput,300)
    }

    toHTML() {
        const title=this.store.getState().title
        return  `
        <div class="header__title" contenteditable>
                ${title || 'New sheet'} 
            </div>
            <div class="header__buttons">
                <span><i class="fas fa-sign-out-alt"></i></span>
                <span><i class="fas fa-trash-alt"></i></span>
            </div>
        `
    }
    onInput(event){
        console.log('onInput')
        const title=$(event.target).text()
        this.$dispatch(changeTitle(title))
    }
}