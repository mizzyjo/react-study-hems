import React, { useEffect, useState } from 'react'
import TestClient from '../components/demo/TestClient'
import TestChart2 from '../components/demo/TestChart2'
import { useHemsApi } from '../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import LineChart from '../components/common/LineChart'
import { produce } from 'immer'
import PowerCard from '../components/common/PowerCard'
import { BuildintStatusTable } from '../components/status/BuildingStatusTable'

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

    // 빌딩 리스트
    const {
        isLoading: isBuildingListLoading,
        error: buildingListError,
        data: buildingListData,
    } = useQuery({
        queryKey: ['buildingList'],
        queryFn: () => hems.buildingList(),
        staleTime: 1000 * 60 * 1,
    })

    const [buildingList, setBuildingList] = useState(initialBuildingList)

    useEffect(() => {
        if(!isBuildingListLoading) {
            setBuildingList(buildingListData.list)
        }
    }, [isBuildingListLoading])

    return (
        <div>
            <h1>Test Page</h1>
            <BuildintStatusTable columnHeaders={rowNmdata} buildingData={buildingList}/>
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

const rowNmdata = [
    '건물명',
    '사이트',
    '소비전력',
    '(일)최대부하(kW)',
    '최근 13개월 최대부하 (kW)',
]

const initialBuildingList = [
    {
        buildingId: 'S0001BLD01',
        buildingName: '테스트건물',
        buildingSeq: '1',
        nowRecvPower: 0,
        page: 1,
        pageSize: 5,
        pagination: null,
        prevRecvPower: 12,
        recordSize: 10,
        recvPower: 0,
        siteId: 'S0001',
        siteName: '케이스마텍사이트',
        siteSeq: '1',
        siteType: null,
    },
]