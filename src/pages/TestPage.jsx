import React, { useEffect, useState } from 'react'
import TestClient from '../components/demo/TestClient'
import TestChart2 from '../components/demo/TestChart2'
import { useHemsApi } from '../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import LineChart from '../components/common/LineChart'
import { produce } from 'immer'

export default function TestPage() {
    const { hems } = useHemsApi()

    const {
        isLoading: isBuildingStatsLoading, 
        error: buildingStatsError, 
        data: buildingStatsData,
    } = useQuery({
        queryKey: ['buildingStats'],
        queryFn: () => hems.buildingStats(),
        staleTime: 1000 * 60 * 1,
    })

    const {
        isLoading: isConsumePowerLoading,
        error: consumePowerError,
        data: consumePowerData,
    } = useQuery({
        queryKey: ['consumeRecvPower'],
        queryFn: () => hems.consumeRecvPower(),
        staleTime: 1000 * 60 * 1,
    })

    console.log('tanstack 1: ', buildingStatsError, isBuildingStatsLoading, buildingStatsData)
    console.log('tanstack 2: ', consumePowerError, isConsumePowerLoading, consumePowerData)

    const [chartData, setChartData] = useState(initialChartData)

    useEffect(() => {
        if (!isConsumePowerLoading) {
            const buildingPrevList = consumePowerData.resultData.buildingPrevList.map(item => item.recvPower)
            const buildingList = consumePowerData.resultData.buildingList.map(item => item.recvPower)

            setChartData(
                produce(chartData, draft => {
                    draft.datasets[0].data = buildingPrevList
                    draft.datasets[1].data = buildingList
                }),
            )
        }
    }, [isConsumePowerLoading])

    return (
        <div>
            <h1>Test Page</h1>
            <LineChart chartName={'소비전력량 그래프 (kWh)'} data={chartData} />
            {/* <TestChart2/> */}
            {/* <TestClient /> */}
        </div>
    )
}

const initialChartData = {
    labels: Array.from({ length: 24 }, (_, i) => String(i)),
    datasets: [
        {
            type: 'bar',
            label: '전일 소비 전력량',
            backgroundColor: '#868786',
            brderWidth: 1,
            data: [],
            tension: 0.1
        },
        {
            type: 'bar',
            label: '기준일 소비 전력량',
            backgroundColor: '#ee7369',
            brderWidth: 1,
            data: [],
            tension: 0.1
        },
    ]
}
