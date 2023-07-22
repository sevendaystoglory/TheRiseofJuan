import React from 'react'

export default function Bar(props){
    return(
        <div className="bar" style={{margin : '2px' , minWidth : '100px' , minHeight : '24px', backgroundColor : '#121212' , borderRadius : '5px', display : 'flex' , flexDirection : 'row' , opacity : '60%' , alignItems : 'center'}}>
            <div className="load" style={{position : 'absolute' , minHeight : '18px' , backgroundColor : 'cyan' , width : `${props.load}px` , marginLeft : '3px' , borderRadius : '5px' , opacity : '60%' , display : 'flex' , justifyContent : 'center'}}>
            </div>
            <div className="loadtext" style={{zIndex : '2' , width : 'auto', fontSize : '12px', marginLeft : '5px'}}>
            {props.name}    
            </div>
        </div>
    )
}