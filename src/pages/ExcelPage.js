import {Page} from "@/pages/Page";
import {createStore} from "@/redux/createStore";
import {rootReducer} from "@/redux/rootReducer";
import {groupInfo} from "@core/utils";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {Stateprocessor} from "@/shared/StateProcessor";
import {LocalStorageClient} from "@core/LocalStorageClient";

export class ExcelPage extends Page{
    constructor(param){
        super(param)
        this.storeSub=null
        this.processor=new Stateprocessor(new LocalStorageClient(this.params))
    }
    async getRoot() {
    const state=await this.processor.get()
    groupInfo(state)
    const store=createStore(rootReducer,state)
    this.storeSub=store.subscribe(this.processor.listen)
    this.excel=new Excel( {
        components:[Header,Toolbar,Formula,Table],
        store
    })
    return Promise.resolve(this.excel.getRoot())
    }
    afterRender() {
        this.excel.init()
    }
    destroy(){
        this.storeSub.unsubscribe()
        this.excel.destroy()
    }
}