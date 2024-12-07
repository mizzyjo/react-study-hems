import { Chart, registerables } from 'chart.js' // Chart.js에서 필요한 컨트롤러를 등록
import React, { useEffect, useRef } from 'react'

// Chart.js에서 사용할 컨트롤러들을 등록
Chart.register(...registerables)

export default function TestChart() {
    const chartRef = useRef(null)

    useEffect(() => {
        // 차트가 이미 존재하는 경우 파괴
        if(chartRef.current && chartRef.current.chartInstance) {
            const chartInstance = chartRef.current.chartInstance
            console.log('chartInstance', chartInstance)
            if(chartInstance) {
                chartInstance.destroy()
            }
        }
        // 새로운 차트 인스턴스 생성
        const ctx = chartRef.current.getContext('2d')
        const chartInstance = new Chart(ctx, {
            type: 'line', // 사용하려는 차트의 타입 (line, bar 등)
            data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        })

        // 차트 인스턴스를 `chartRef`에 저장
        chartRef.current.chartInstance = chartInstance

        // 클린업 함수: 컴포넌트가 언마운트될 때 차트 삭제
        return() => {
            if(chartRef.current&& chartRef.current.chartInstance) {
                const chartInstance = chartRef.current.chartInstance
                console.log('chartInstance', chartInstance)

                chartRef.current.chartInstance.destroy()
                if(chartInstance) {
                    chartInstance.destroy()
                }
            }
        }
    }, [])

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    )
}

const data = {
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
