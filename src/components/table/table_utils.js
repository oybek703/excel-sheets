import {$} from "@core/dom";
function getSize(width){
    return `${width}px`
}
export function shouldResize(event) {
    return $(event.target).dataset.type
}
export function handleResize(event,root) {
    let newSize,delta,width,height
    const resizeType=$(event.target).dataset.resize
    const resizer=$(event.target)
    const parent=$(event.target).closest('[data-resizer]')
    const coords=$(parent).getCoords()
    const parentCol=$(parent).dataset.col
    const cols=$(root).getAll(`[data-col="${parentCol}"]`)
    document.onmousemove=(e)=>{
        if(resizeType==='col'){
            delta=e.pageX-coords.right
            width=coords.width
            newSize=getSize(delta+width)
            resizer.css({height:'100vh',right:-delta})
        }
        else {
            delta = e.pageY - coords.bottom
            height = coords.height
            newSize =getSize(height+delta)
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
    }
}