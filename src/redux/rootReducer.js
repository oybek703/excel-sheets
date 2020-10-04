import {applystyles, changestyles, changetext, changetitle, tableresize} from "@/redux/types";
import {camelToDash} from "@core/utils";

export function rootReducer(state,action) {
    let prevState
     switch (action.type) {
         case tableresize:
             const type=action.data.type
             prevState=state[`${type}State`]||{}
             prevState[action.data.id]=action.data.value
             return {...state,[`${type}State`]:prevState}
         case changetext:
             prevState=state['data']||{}
             prevState[action.data.id]=action.data.value
             return {...state,currentText:action.data.value,data:prevState}
         case changetitle:
             return {...state,title:action.data}
         case changestyles:
             return {...state,currentStyles:action.data}
         case applystyles:
             prevState=state['stylesState']||{}
             action.data.ids.forEach(id=>{
                 prevState[id]={...prevState[id],...action.data.value}
             })
             return {...state,stylesState:prevState}
         default:return  state
     }
}