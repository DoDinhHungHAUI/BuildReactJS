import React from 'react';

export default function Banner({children , title , subtitle}){//chính là cái props
	
    return(
        <div className = "banner">
            <h1>{title}</h1>
            <div />
            <p>{subtitle}</p>
            {children}
        </div>
    );
}
