import {Page} from "@/pages/Page";
import {createStore} from "@/redux/createStore";
import {rootReducer} from "@/redux/rootReducer";
import {debounce, groupInfo, storage, storageName} from "@core/utils";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

export class ExcelPage extends Page{
    getRoot() {
    const params=this.params || Date.now().toString()
    const state=storage(storageName(params))
    groupInfo(state)
    const store=createStore(rootReducer,state)
    const stateListener=debounce(state=>{
    storage(storageName(params),state)
    },300)
    store.subscribe(stateListener)
    this.excel=new Excel( {
        components:[Header,Toolbar,Formula,Table],
        store
    })
    return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy(){
        this.excel.destroy()
    }
}