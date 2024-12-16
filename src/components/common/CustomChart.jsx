import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)


export const CustomChart = ({ chartTitle, data, options }) => {
    return (
        <>
            <h2>{chartTitle}</h2>
            <Line data={data} options={options} />
        </>
    )
}

