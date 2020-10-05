export class ActiveRouter {
    static get path(){
        return window.location.hash.slice(1)
    }
    static get param(){
        return this.path.split('/')[1]
    }
    static navigate(param){
        window.location.hash=param
    }
}