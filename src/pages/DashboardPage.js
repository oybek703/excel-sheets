import {Page} from "@/pages/Page";
import {$} from "@core/dom";
import {createList} from "@/pages/dashboard.funtions";
export class DashboardPage extends Page{
    getRoot() {
       const dashboard= $.create('div','dashboard')
        const id=Date.now().toString()
        $(dashboard).html(`
         <div class="dashboard__header">
            <h1 class="dashboard__title">Excel Dashboard.</h1>
        </div>
        <div class="dashboard__new">
            <div class="dashboard__view">
                <a href="#excel/${id}" class="dashboard__create">New <br>Table</a>
            </div>
        </div>
        <div class="dashboard__table">
            ${createList()}
        </div>
        `)
        return dashboard
    }
    destroy(){}
}