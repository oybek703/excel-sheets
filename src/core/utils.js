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