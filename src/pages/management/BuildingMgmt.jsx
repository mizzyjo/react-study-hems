import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Loading } from '../../components/common/Loading'
import { QUERY_KEYS } from '../../config/querykeys'
import { useHemsApi } from '../../context/HemsApiContext'
import { Error } from '../../components/common/Error'
import { BuildintStatusTable } from '../../components/status/BuildingStatusTable'

export default function BuildingMgmt() {
    const { hems } = useHemsApi()

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

    if (isBuildingListLoading) {
        return <Loading />
    }
    
    if (buildingListError) {
        return <Error error={{ buildingListError }} />
    }
    
    
    return (
        <div>
            <h1>건물 관리</h1>
            <BuildintStatusTable data={buildingList}/>
        </div>
    )
}

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