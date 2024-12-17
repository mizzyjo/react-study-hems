import React from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { QUERY_KEYS, STALE_TIME } from '../../config/queryConfig'
import { useQuery } from '@tanstack/react-query'
import { SiteMgmtTable } from '../../components/management/SiteMgmtTable'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'


export default function SiteMgmt() {
    const { hems } = useHemsApi()
    
    const {
        isLoading: isSiteListLoading,
        error: siteListError,
        data: siteListData,
    } = useQuery({
        queryKey: [QUERY_KEYS.siteList],
        queryFn: () => hems.siteList(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const siteList = siteListData?.list || []

    if (isSiteListLoading) {
        return <Loading />
    }
    
    if (siteListError) {
        return <Error error={siteListError} />
    }

    return (
        <div>
            <h1>사이트 관리</h1>
            <SiteMgmtTable data={siteList} />
        </div>
    )
}