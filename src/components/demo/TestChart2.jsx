import React, { useEffect, useRef } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'

// TODO: 이거 뭔지 알아보기
ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    LineElement, 
    PointElement
)

export default function TestLineChart() {
    const chartRef = useRef(null) 

    useEffect(() => {
        const chart = chartRef.current

        return () => {
            if (chart && chart.chartInstance) {
                chart.chartInstance.destroy()
            }
        }
    }, [])

    return (
        <div>
            <Line ref={chartRef} data={lineData} /> 
            {/* <Doughnut ref={chartRef} data={doughnutData} />  */}
        </div>
    )
}

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [1, 2, 3, 4, 5],
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [1, 2, 3, 4, 5, 6],
            borderColor: 'red',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [1, 2, 3, 4, 5, 6],
        },
    ],
}

const doughnutData = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
    }]
}