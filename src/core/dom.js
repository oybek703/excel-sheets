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
    addClass(cls){
        this.$el.classList.add(cls)
    }
    removeClass(cls){
        this.$el.classList.remove(cls)
    }
    find(selector){
        return this.$el.querySelector(selector)
    }
    focus(){
        this.$el.focus()
        return this
    }
    append(node){
        if(Element.prototype.append){
            this.$el.append(node)
            return this
        }
        this.$el.appendChild(node)
        return this
    }
    text(text){
        if(typeof text!=='undefined'){
            this.$el.textContent=text
            return this
        }
        if(this.$el.tagName.toLocaleLowerCase()==='input'){
            return this.$el.value.trim()
        }
        return  this.$el.textContent.trim()
    }
    attr(name,value){
        if(value){
            this.$el.setAttribute(name,value)
            return this
        }
        return  this.$el.getAttribute(name)

    }
    getStyles(styles=[]){
        return styles.reduce((acc,key)=>{
            acc[key]=this.$el.style[key]
            return acc
        },{})
    }
    clear(){
        this.$el.innerHTML=''
        return this
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
