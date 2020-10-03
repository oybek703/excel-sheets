import {$} from "@core/dom";
export class TableSelection {
    static className='selected'
    constructor(){
        this.group=[]
        this.current=null
    }
    select(cell){
        this.clear()
        this.group.push(cell)
        this.current=cell
        $(this.current).focus()
        $(cell).addClass(TableSelection.className)
    }
    clear(){
        this.group.forEach(cell=>$(cell).removeClass(TableSelection.className))
        this.group=[]
    }
    selectGroup(cells){
        this.clear()
        this.group=cells
        cells.forEach(cell=>$(cell).addClass(TableSelection.className))
    }
}
