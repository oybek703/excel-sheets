import {initialState} from "@/redux/initialState";
export function getEventName(event) {
    return `on${event[0].toUpperCase()}${event.slice(1)}`
}

export function parse(id) {
    const ids=id.split(':')
    return{
        col:Number(ids[0]),
        row:Number(ids[1])
    }
}
export function range(start,end) {
    if(end<start){
        [start,end]=[end,start]
    }
    const length=end-start+1
    return new Array(length)
        .fill('')
        .map((_,index)=>start+index)
}
export function preventDefault(event) {
    event.preventDefault()
}
export function storage(key,value) {
    if(value){
        localStorage.setItem(key,JSON.stringify(value))
    }
    return JSON.parse(localStorage.getItem(key)) || initialState
}
export function isEqual(a,b) {
    if(typeof a==='object' && typeof b==='object'){
        return JSON.stringify(a)===JSON.stringify(b)
    }
    return a===b
}
export function camel(string) {
    return string.replace(/[A-Z]/g,'-$&').toLocaleLowerCase()
}
export function toInlineStyles(styles) {
    return  Object.keys(styles)
        .map(key=>`${[camel(key)]}:${styles[key]}`)
        .join(';')
}
export function debounce(fn,delay) {
    let timeout
    return function () {
        const later=()=>{
            clearTimeout(timeout)
            fn.apply(this,arguments)
        }
        clearTimeout(timeout)
        timeout=setTimeout(later,delay)
    }
}
export function parseText(value) {
    try {
        if(value.startsWith('=')){
            return  eval(value.slice(1))
        }
    }catch (e) {
        return value
    }
    return value
}

