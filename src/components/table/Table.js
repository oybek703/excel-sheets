import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table_template";
import {handleResize, shouldResize} from "@/components/table/table_utils";

export class Table extends ExcelComponent{
    static className='excel__table table'
    constructor(root){
        super(root,{
            name:'Table',
            listeners:['mousedown']
        })
    }
    toHTML() {
        return createTable(20)
    }
    onMousedown(event){
        if(shouldResize(event)){
            handleResize(event,this.root)
        }
    }
}
