import React, { useEffect, useState } from 'react'
import TestClient from '../components/demo/TestClient'
import TestChart2 from '../components/demo/TestChart2'
import { useHemsApi } from '../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import LineChart from '../components/common/LineChart'
import { produce } from 'immer'
import PowerCard from '../components/common/PowerCard'

export default function TestPage() {
    const { hems } = useHemsApi()

    // 최고 소비 전력 기록(빌딩 관련 모든 정보)
    const {
        isLoading: isBuildingTotalDataLoading,
        error: buildingTotalDataError,
        data: buildingTotalData,
    } = useQuery({
        queryKey: ['buildingTotalInfo'],
        queryFn: () => hems.buildingTotalInfo(),
        staleTime: 1000 * 60 * 1,
    })

    const [buildingInfo, setBuildingInfo] = useState(initialBuildingInfo)

    useEffect(() => {
        if(!isBuildingTotalDataLoading) {
            setBuildingInfo(buildingTotalData.resultData.buildingInfoList)
        }
    }, [isBuildingTotalDataLoading])

    // 누적 소비 전력량
    const {
        isLoading: isBuildingStatsLoading, 
        error: buildingStatsError, 
        data: buildingStatsData,
    } = useQuery({
        queryKey: ['buildingStats'],
        queryFn: () => hems.buildingStats(),
        staleTime: 1000 * 60 * 1,
    })

    const [recvPower, setRecvPower] = useState(0)

    useEffect(() => {
        if(!isBuildingStatsLoading) {
            setRecvPower(buildingStatsData.resultData.recvPower)
        }

    }, [isBuildingStatsLoading])

    // 소비 전력량 그래프
    const {
        isLoading: isConsumePowerLoading,
        error: consumePowerError,
        data: consumePowerData,
    } = useQuery({
        queryKey: ['consumeRecvPower'],
        queryFn: () => hems.consumeRecvPower(),
        staleTime: 1000 * 60 * 1,
    })

    console.log('tanstack 0: ', buildingTotalDataError, isBuildingTotalDataLoading, buildingTotalData)
    console.log('tanstack 2: ', consumePowerError, isConsumePowerLoading, consumePowerData)
    console.log('tanstack 1: ', buildingStatsError, isBuildingStatsLoading, buildingStatsData)

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
            <PowerCard title={'순간 최고 소비 전력'} kwValue={buildingInfo[0].recvPower + 'kw'} />
            <PowerCard title={'일 최고 소비 전력량'} kwValue={buildingInfo[1].recvPower + 'kw'} />
            <PowerCard title={'월 최고 소비 전력량'} kwValue={buildingInfo[2].recvPower + 'kw'} />
            <PowerCard title={'년 최고 소비 전력량'} kwValue={buildingInfo[3].recvPower + 'kw'} />
            <PowerCard title={'누적 소비 전력량'} kwValue={recvPower + 'kw'} />
            <LineChart chartName={'소비전력량 그래프 (kWh)'} data={chartData} />
            {/* <TestChart2/> */}
            {/* <TestClient /> */}
        </div>
    )
}

const initialBuildingInfo = [
    {
        flagDate: 'now',
        recvPower: 0,
    },
    {
        flagDate: 'day',
        recvPower: 0,
    },
    {
        flagDate: 'month',
        recvPower: 0,
    },
    {
        flagDate: 'year',
        recvPower: 0,
    },
]

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
