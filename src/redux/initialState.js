import {defaultStyles, defaultTitle} from "@/constants";

export const initialState={
    currentText:'',
    title:defaultTitle,
    currentStyles:defaultStyles,
    colState:{},
    rowState:{},
    data:{},
    stylesState:{},
    lastUpdateDate:{day:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()}}