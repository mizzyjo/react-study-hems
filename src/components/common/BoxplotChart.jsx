import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot'
import { cloneDeep } from 'lodash'

Chart.register(BoxPlotController, BoxAndWiskers)

export const BoxplotChart = ({ chartTitle, data, options }) => {
    const chartRef = useRef()

    useEffect(() => {
        // 차트가 이미 존재하면 기존 차트를 제거
        if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.destroy()
        }

        const chartData = cloneDeep(data)
        const chartOptions = cloneDeep(options)

        // 새 차트 생성
        const newChart = new Chart(chartRef.current, {
            type: 'boxplot',
            data: chartData,
            options: chartOptions,
        })

        // 차트를 canvas 요소에 저장
        chartRef.current.chart = newChart

        return () => {
            // 컴포넌트가 unmount되면 차트를 제거
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy()
            }
        }
    }, [data, options])

    return (
        <div>
            <h2>{chartTitle}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    )
}
