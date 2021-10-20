import React from 'react'
import './TitleSection.scss';
export default function TitleSection({text,color}) {
    return (
        <div className = {`title title--${color}`}>
            {text}
        </div>
    )
}
