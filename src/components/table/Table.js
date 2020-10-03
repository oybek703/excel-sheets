import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table_template";
import {
    handleResize,
    isCell,
    matrix,
    navigate,
    shouldNavigate,
    shouldResize,
    shouldSelectGroup
} from "@/components/table/table_utils";
import {$} from "@core/dom";
import {parse, preventDefault} from "@core/utils";

export class Table extends ExcelComponent{
    static className='excel__table table'
    constructor(root,options){
        super(root,{
            name:'Table',
            listeners:['mousedown','keydown'],
            ...options
        })
    }
    init() {
        super.init()
        this.selection.select($(this.root).find('[data-id="0:0"]'))
        this.$on('formula:input',text=>{
            $(this.selection.current).text(text)
        })
        this.$on('formula:keydown',()=>{
            $(this.selection.current).focus()
        })
    }
    toHTML() {
        return createTable(30)
    }
    selectCell(cell){
        try{
            const cellText=$(cell).text()
            this.selection.select(cell)
            this.$emit('table:select',cellText)
        }catch (e) {}

    }
    onMousedown(event){
        if(shouldResize(event)){
            handleResize(event,this.root)
        }
        if(isCell(event)){
            if(shouldSelectGroup(event)){
                const selectedCell=parse($(this.selection.current).dataset.id)
                const currentCell=parse($(event.target).dataset.id)
                const cells=matrix(selectedCell,currentCell,this.root)
                this.selection.selectGroup(cells)
            }
            else {
                const cellId=$(event.target).dataset.id
                const cell=$(this.root).find(`[data-id="${cellId}"]`)
                this.selectCell(cell)
            }
        }
    }
    onKeydown(event){
        let id=$(this.selection.current).dataset.id
        let nextCell=$(this.root).find(`[data-id="${id}"]`);
        if(shouldNavigate(event)&&!event.shiftKey){
            preventDefault(event)
            const {key}=event
            const nextCellId=navigate(key,parse(id))
            nextCell=$(this.root).find(`[data-id="${nextCellId}"]`)
            this.selectCell(nextCell)
        } else {
            this.selectCell(nextCell)
        }
    }
}

