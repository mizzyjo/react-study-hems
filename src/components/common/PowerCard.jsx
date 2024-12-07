import React from 'react'

export default function PowerCard({ title, kwValue, date }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{kwValue}</p>
            <p>{date}</p>
        </div>
    )
}
