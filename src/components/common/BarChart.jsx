import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function BarChart({ chartTitle, data }) {
    return (
        <>
            <h2>{chartTitle}</h2>
            <Bar data={data} />
        </>
    )
}
