import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {debounce} from "@core/utils";
import {ActiveRouter} from "@core/router/ActiveRouter";

export class Header extends ExcelComponent{
    static className='excel__header header'
    constructor(root,options){
        super(root,{
            name:'Header',
            listeners:['input','click'],
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
                <a data-button="exit"><i class="fas fa-sign-out-alt"></i></a>
                <a data-button="delete"><i class="fas fa-trash-alt"></i></a>
            </div>
        `
    }
    onInput(event){
        const title=$(event.target).text()
        this.$dispatch(changeTitle(title))
    }
    onClick(event){
        const target=$(event.target).closest('[data-button]') || $(event.target)
        if($(target).dataset.button){
            const type=$(target).dataset.button
            if(type==='exit'){
                ActiveRouter.navigate('')
            }else {
                const decision=confirm('Are you sure you want to delete this sheet?')
                if(decision){
                    localStorage.removeItem(`excel:${ActiveRouter.param}`)
                    ActiveRouter.navigate('')
                }
            }
        }
    }
}