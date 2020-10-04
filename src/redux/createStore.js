export function createStore(rootReducer,initialState={}) {
    let state=rootReducer(initialState,{type:'__INIT__'})||initialState
    let listeners=[]
    return {
        dispatch(action){
           state=rootReducer(state,action)
           listeners.forEach(listener=>{
               listener(state)
           })
        },
        subscribe(fn){
            listeners.push(fn)
            return {
                unsunscribe(){
                listeners.filter(listener=>listener!==fn)
            }
         }
        },
        getState(){
            return JSON.parse(JSON.stringify(state))
        }

    }
}