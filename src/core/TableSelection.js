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
        $(cell).focus().addClass(TableSelection.className)
    }
    selectedIds(){
        this.group.forEach(cell=>$(cell).dataset.id)
    }
    clear(){
        this.group.forEach(cell=>$(cell).removeClass(TableSelection.className))
        this.group=[]
    }
    selectedIds(){
        return this.group.map(cell=>$(cell).dataset.id)
    }
    selectGroup(cells){
        this.clear()
        this.group=cells
        cells.forEach(cell=>$(cell).addClass(TableSelection.className))
    }
    applyStyle(styles){
        this.group.forEach(cell=>$(cell).css(styles))
    }
}
