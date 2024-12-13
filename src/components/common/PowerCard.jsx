import React from 'react'

export default function PowerCard({ title, kwValue, description, img: ImgComponent }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{kwValue}</p>
            {description &&  <p>{description}</p>}
            {ImgComponent && <ImgComponent size={30}/>}
        </div>
    )
}
