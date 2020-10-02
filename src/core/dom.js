class Dom {
    constructor(selector){
        this.$el=typeof selector==='string'
            ? document.querySelector(selector)
            : selector
    }
    html(html){
        if(typeof html==='string'){
            this.$el.innerHTML=html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    setClass(cls){
        this.$el.className=cls
        return this
    }
    on(event,fn){
        this.$el.addEventListener(event,fn)
    }
    off(event,fn){
        this.$el.removeEventListener(event,fn)
    }
    get dataset(){
        return this.$el.dataset
    }
    closest(selector){
        return  this.$el.closest(selector)
    }
    getCoords(){
        return this.$el.getBoundingClientRect()
    }
    css(style={}){
        if(typeof style=="string"){
            return  this.$el.style[style]
        }
        Object.assign(this.$el.style,style)
        return this
    }
    getAll(selector){
        return this.$el.querySelectorAll(selector)
    }
}
export function $(selector) {
    return new Dom(selector)
}
$.create=(element,classes)=>{
    const el=document.createElement(element)
    if(classes){
        el.classList.add(classes)
    }
    return el
}
