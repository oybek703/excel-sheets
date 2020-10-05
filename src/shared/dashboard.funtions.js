import {storage} from "@core/utils";

function toHTML(key) {
    const id=key.split(':')[1]
    const title=storage(key).title
    const date=new Date(Number(Number(id)))
    return `
       <li class="dashboard__record">
            <a href="#excel/${id}">${title}</a>
            <strong>
            ${date.toLocaleDateString()}
            ${date.toLocaleTimeString()}
            </strong>
       </li>
    `
}
function getAllKeys() {
    const keys=[]
    for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i)
        if(!key.includes('excel')){
            continue
        }
    keys.push(key)
    }
    return keys
}
export function createList() {
    const keys=getAllKeys()
    if(!keys.length){
        return '<p>You have no any sheets yet...</p>'
    }
    return `
        <div class="dashboard__list-header">
                <span>Table name</span>
                <span>Opened date</span>
            </div>
        <ul class="dashboard__list">
              ${keys.map(toHTML).join('')}
        </ul>
    `
}