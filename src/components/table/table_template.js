import {camel, camelToDash, parseText, toInlineStyles} from "@core/utils";
import {defaultStyles} from "@/constants";

const CODES={
    A:65,
    Z:90
}
const DEFAULT_WIDTH='85px';
const DEFAULT_HEIGHT='24px';
function createRow(cells,index) {
    const resize=`<div class="table__resize" data-type="resize" data-resize="row"></div>`
    return function (state) {
        const height=heightFromStorage(state,index)
        return `
        <div class="table__row" data-resizer="row" data-row="${index}" style="height: ${height}">
            <div class="table__row-info">
                ${index ? index : ''}
                ${index ? resize : ''}
            </div>
            <div class="table__row-data">
                ${cells}
            </div>
        </div>
    `
    }
}
function createCol(state,index) {
    const letter=getFromCharCode(index)
    const width=widthFromStorage(state,index) || DEFAULT_WIDTH
    const resize=`<div class="table__resize" data-type="resize" data-resize="col"></div>`
    return `
            <div 
            class="table__col" 
            data-resizer="col" 
            data-col="${index}" 
            style="width: ${width}">
                ${letter}
                ${resize}
            </div>
    `
}
function createCell(col,row) {
    return function (state) {
        const id=`${col}:${row}`
        const data=getCellData(state,id)
        const width=widthFromStorage(state,col)|| DEFAULT_WIDTH
        const styles=toInlineStyles(stylesFromStorage(state,id)||defaultStyles)
        return `
        <div 
        class="table__cell" 
        spellcheck="false" 
        contenteditable 
        data-col="${col}" 
        data-id=${id}
        style='width:${width};${styles}'
        data-value="${data || ''}">
            ${parseText(data || '')}
        </div>
    `
    }

}
function getFromCharCode(index) {
    return String.fromCharCode(CODES.A+index)
}
function widthFromStorage(state,index) {
    if(state){
        return state['colState'] ? state['colState'][index] : DEFAULT_WIDTH
    }
    return DEFAULT_WIDTH
}
function heightFromStorage(state,index) {
    if(state){
        return state['rowState'] ? state['rowState'][index] : DEFAULT_HEIGHT
    }
    return DEFAULT_HEIGHT
}
function stylesFromStorage(state,id) {
    if(state){
        return state['stylesState'] ? state['stylesState'][id] : defaultStyles
    }
    return defaultStyles
}
function getCellData(state,id) {
    if(state){
        return state['data'][id]
    }
    return ''
}
export function createTable(rowsCount=10,state) {
    const colsCount=CODES.Z-CODES.A+1
    let rows=[]
    const cols=new Array(colsCount)
        .fill('')
        .map((_,index)=>createCol(state,index))
        .join('')
    rows.push(createRow(cols)(state))
    for(let row=0;row<rowsCount;row++){
        const cells=new Array(colsCount)
            .fill('')
            .map((_,col)=>createCell(col,row)(state))
            .join('')
        rows.push(createRow(cells,row+1)(state))
    }
    return rows.join('')
}