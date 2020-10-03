const CODES={
    A:65,
    Z:90
}
function createRow(cells,index) {
    const resize=`<div class="table__resize" data-type="resize" data-resize="row"></div>`
    return `
        <div class="table__row" data-resizer="row">
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
function createCol(_,index) {
    const letter=getFromCharCode(index)
    const resize=`<div class="table__resize" data-type="resize" data-resize="col"></div>`
    return `
            <div class="table__col" data-resizer="col" data-col="${index}">
                ${letter}
                ${resize}
            </div>
    `
}
function createCell(col,row) {
    return `
        <div class="table__cell" spellcheck="false" contenteditable data-col="${col}" data-id="${col}:${row}"></div>
    `
}
function getFromCharCode(index) {
    return String.fromCharCode(CODES.A+index)
}

export function createTable(rowsCount=10) {
    const colsCount=CODES.Z-CODES.A+1
    let rows=[]
    const cols=new Array(colsCount)
        .fill('')
        .map(createCol)
        .join('')
    rows.push(createRow(cols))
    for(let row=0;row<rowsCount;row++){
        const cells=new Array(colsCount)
            .fill('')
            .map((_,col)=>createCell(col,row)).join('')
        rows.push(createRow(cells,row+1))
    }
    return rows.join('')
}