function createButton(button) {
    const meta=`data-type="button" data-value='${JSON.stringify(button.value)}'`
    return `<span 
                class="${button.active ? 'active'  : ''}"
                ${meta}>
                <i class="${button.cls}"></i>
            </span>`
}
export function createToolbar(state) {
    const buttons=[
        {
            cls:'fas fa-align-left',
            active:state['textAlign']==='left',
            value: {textAlign:'left'}
        },
        {
            cls:'fas fa-align-right',
            active:state['textAlign']==='right',
            value: {textAlign:'right'}
        },
        {
            cls:'fas fa-align-center',
            active:state['textAlign']==='center',
            value: {textAlign:'center'}
        },
        {
            cls:'fas fa-bold',
            active:state['fontWeight']==='bold',
            value:{fontWeight:state['fontWeight']==='bold' ? 'normal' : 'bold'}
        },
        {
            cls:'fas fa-italic',
            active:state['fontStyle']==='italic',
            value:{fontStyle:state['fontStyle']==='italic'? 'normal' :'italic'}
        },
        {
            cls:'fas fa-underline',
            active:state['textDecoration']==='underline',
            value:{textDecoration:state['textDecoration']==='underline' ? 'none' : 'underline'}
        }
    ]
    return buttons.map(createButton).join('')
}