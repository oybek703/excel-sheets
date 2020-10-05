import {$} from "@core/dom";
import {range} from "@core/utils";
function getSize(width){
    return `${width}px`
}
export function shouldResize(event) {
    return $(event.target).dataset.type
}
export function isCell(event) {
    return $(event.target).dataset.id
}
export function shouldSelectGroup(event) {
    return event.shiftKey
}
export function matrix(selectedCell,currentCell,root) {
    const cols=range(currentCell.col,selectedCell.col)
    const rows=range(currentCell.row,selectedCell.row)
    return cols.reduce((acc,col)=>{
        rows.forEach(row=>{
            const el=$(root).find(`[data-id="${col}:${row}"]`)
            acc.push(el)
        })
        return acc
    },[])
}
export function shouldNavigate(event) {
    const keys=['Enter','Tab','ArrowDown','ArrowRight','ArrowLeft','ArrowUp']
    const {key}=event
    return (keys.includes(key)&& noShift(event))
}
export function noShift(event) {
    return !event.shiftKey
}
export function navigate(key,{col,row}) {
    if (key === 'Enter' || key==='ArrowDown') {
        row++
    } else if (key === 'ArrowRight'|| key==='Tab') {
        col++
    } else if (key === 'ArrowUp') {
        row--
    } else if (key === 'ArrowLeft') {
        col--
    }
    return `${col}:${row}`
}
export function handleResize(event,root) {
    return new Promise(resolve => {
    let newSize,delta,newWidth,newHeight
    const resizeType=$(event.target).dataset.resize
    const resizer=$(event.target)
    const parent=$(event.target).closest('[data-resizer]')
    const coords=$(parent).getCoords()
    const parentCol=$(parent).dataset.col
    const cols=$(root).getAll(`[data-col="${parentCol}"]`)
    document.onmousemove=(e)=>{
        if(resizeType==='col'){
            delta=e.pageX-coords.right
            newWidth=coords.width
            newSize=getSize(delta+newWidth)
            resizer.css({height:'100vh',right:-delta})
        }
        else {
            delta = e.pageY - coords.bottom
            newHeight = coords.height
            newSize =getSize(newHeight+delta)
            resizer.css({width:'100vw',bottom:-delta})
        }
    }
    document.onmouseup=()=>{
        document.onmousemove=null
        document.onmouseup=null
        if(resizeType==='col'){
            resizer.css({height:'100%',right: 0})
            cols.forEach(col=>$(col).css({width:newSize}))
        }
        else {
            resizer.css({width:'100%',bottom: 0})
            $(parent).css({height: newSize})
        }
        resolve({id:$(parent).dataset[resizeType],value:newSize,type:resizeType})
        }
    })
}
