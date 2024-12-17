import React from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import LineChart from '../../components/common/LineChart'
import { produce } from 'immer'
import PowerCard from '../../components/common/PowerCard'
import { BuildintStatusTable } from '../../components/status/BuildingStatusTable'
import { initialChartConfig } from '../../config/buildingStatusChart'
import { QUERY_KEYS } from '../../config/queryConfig'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'

export default function BuildingStatus() {
    const { hems } = useHemsApi()

    // 최고 소비 전력 기록(빌딩 관련 모든 정보)
    const {
        isLoading: isBuildingTotalDataLoading,
        error: buildingTotalDataError,
        data: buildingTotalData,
    } = useQuery({
        queryKey: [QUERY_KEYS.buildingTotalInfo],
        queryFn: () => hems.buildingTotalInfo(),
        staleTime: 1000 * 60 * 1,
    })

    const buildingInfo = buildingTotalData?.resultData.buildingInfoList || initialBuildingInfo

    // 누적 소비 전력량
    const {
        isLoading: isBuildingStatsLoading, 
        error: buildingStatsError, 
        data: buildingStatsData,
    } = useQuery({
        queryKey: [QUERY_KEYS.buildingStats],
        queryFn: () => hems.buildingStats(),
        staleTime: 1000 * 60 * 1,
    })

    const recvPower = buildingStatsData?.resultData.recvPower || 0

    // 소비 전력량 그래프
    const {
        isLoading: isConsumePowerLoading,
        error: consumePowerError,
        data: consumePowerData,
    } = useQuery({
        queryKey: [QUERY_KEYS.consumeRecvPower],
        queryFn: () => hems.consumeRecvPower(),
        staleTime: 1000 * 60 * 1,
    })

    const chartConfig = produce(initialChartConfig, (draft) => {
        if (consumePowerData) {
            draft.datasets[0].data = consumePowerData.resultData.buildingPrevList.map(item => item.recvPower)
            draft.datasets[1].data = consumePowerData.resultData.buildingList.map(item => item.recvPower)
        }
    })

    // 빌딩 리스트
    const {
        isLoading: isBuildingListLoading,
        error: buildingListError,
        data: buildingListData,
    } = useQuery({
        queryKey: [QUERY_KEYS.buildingStatusList],
        queryFn: () => hems.buildingStatusList(),
        staleTime: 1000 * 60 * 1,
    })

    const buildingList = buildingListData?.list || initialBuildingList

    if (isBuildingTotalDataLoading || isBuildingStatsLoading || isConsumePowerLoading || isBuildingListLoading) {
        return <Loading />
    } 
    
    if (buildingTotalDataError || buildingStatsError || consumePowerError || buildingListError) {
        return <Error error={{ buildingTotalDataError, buildingStatsError, consumePowerError, buildingListError }} />
    }

    return (
        <div>
            <h1>건물 현황</h1>
            {buildingInfo.map((info, idx) => (
                <PowerCard key={info.flagDate} title={powerCardTitles[idx]} kwValue={info.recvPower + 'kw'} />
            ))}
            <PowerCard title={'누적 소비 전력량'} kwValue={recvPower + 'kw'} />
            <LineChart chartTitle={'소비전력량 그래프 (kWh)'} data={chartConfig} />
            <BuildintStatusTable data={buildingList} />
        </div>
    )
}

const powerCardTitles = [
    '순간 최고 소비 전력', 
    '일 최고 소비 전력량', 
    '월 최고 소비 전력량', 
    '년 최고 소비 전력량'
]

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
        siteName: '테스트사이트',
        siteSeq: '1',
        siteType: null,
    },
]