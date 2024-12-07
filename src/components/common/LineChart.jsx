import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function LineChart({ chartName, data }) {
    return (
        <>
            <h2>{chartName}</h2>
            <Line data={data} />
        </>
    )
}
