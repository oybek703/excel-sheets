import {applystyles, changestyles, changetext, changetitle, tableresize} from "@/redux/types";
class ActionCreator {
   static  create(type,data){
        return {
            type,
            data
        }
    }
}

export function tableResize(data) {
    return ActionCreator.create(tableresize,data)
}
export function changeText(data) {
    return ActionCreator.create(changetext,data)
}
export function changeTitle(data) {
    return ActionCreator.create(changetitle,data)
}
export function changeStyles(data) {
    return ActionCreator.create(changestyles,data)
}
export function applyStyles(data) {
   return  ActionCreator.create(applystyles,data)
}