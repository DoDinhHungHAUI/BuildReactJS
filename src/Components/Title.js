import React from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import {Link} from 'react-router-dom';

export default function Title({title}){
    return(
        <div className = "section-title">
            <h4>{title}</h4>
            <div />
        </div>
    );
}

