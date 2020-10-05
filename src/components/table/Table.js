import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table_template";
import {
    handleResize,
    isCell,
    matrix,
    navigate, noShift,
    shouldNavigate,
    shouldResize,
    shouldSelectGroup
} from "@/components/table/table_utils";
import {$} from "@core/dom";
import {parse, parseText, preventDefault} from "@core/utils";
import {applyStyles, changeStyles, changeText, tableResize} from "@/redux/actions";
import {defaultStyles} from "@/constants";

export class Table extends ExcelComponent{
    static className='excel__table table'
    constructor(root,options){
        super(root,{
            name:'Table',
            listeners:['mousedown','keydown','input'],
            ...options
        })
    }
    init() {
        super.init()
        this.selectCell($(this.root).find('[data-id="0:0"]'))
        this.$on('formula:input',text=>{
            $(this.selection.current).attr('data-value',text)
            $(this.selection.current).text(parseText(text))
            this.updateStoreText()
        })
        this.$on('formula:keydown',()=>{
            $(this.selection.current).focus()
        })
        this.$on('toolbar:applystyle',value=>{
            this.selection.applyStyle(value);
            const ids=this.selection.selectedIds()
            this.$dispatch(applyStyles({ids,value}))
            this.$dispatch(changeStyles(value))
        })
    }
    toHTML() {
        const state=this.store.getState()
        return createTable(100,state)
    }
    async resizeTable(event){
        const size= await handleResize(event,this.root)
        this.$dispatch(tableResize(size))
    }
    selectCell(cell){
            this.selection.select(cell)
            this.$emit('table:select',$(this.selection.current).dataset.value)
            const value=$(this.selection.current).getStyles(Object.keys(defaultStyles))
            this.$dispatch(changeStyles(value))
    }
    onMousedown(event){
        if(shouldResize(event)){
            return  this.resizeTable(event)
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
            if(shouldNavigate(event)){
                preventDefault(event)
                const {key}=event
                const nextCellId=navigate(key,parse(id))
                nextCell=$(this.root).find(`[data-id="${nextCellId}"]`) || this.selection.current
                this.selectCell(nextCell)
            } if(noShift(event)){
                this.selectCell(nextCell)
            }
    }
    updateStoreText(){
        const target=$(this.selection.current)
        const value=target.dataset.value
        const id=target.dataset.id
        this.$dispatch(changeText({id,value}))
    }
    onInput(event){
        const  text=$(event.target).text()
        this.$emit('table:input',text)
        $(this.selection.current).attr('data-value',text)
        this.updateStoreText()
    }
}

