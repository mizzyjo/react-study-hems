import React from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { CustomChart } from '../../components/common/CustomChart'
import { FaBeer } from "react-icons/fa"
import PowerCard from '../../components/common/PowerCard'
import { BoxplotChart } from '../../components/common/BoxplotChart'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'
import { QUERY_KEYS, STALE_TIME } from '../../config/queryConfig'
import { initialIntegratedChartConfig, initialEvConnectionChartConfig } from '../../config/siteStatusChart'

export default function SiteStatus() {
    const { hems } = useHemsApi()

    /**
     * 사이트 현황 - 통합 차트 (Mixed Chart)
     */
    // ESS 충방전량
    const {
        isLoading: isEssDataLoading,
        error: essDataError,
        data: essResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.essData],
        queryFn: () => hems.essData(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    // PV 발전량
    const {
        isLoading: isPvDataLoading,
        error: pvDataError,
        data: pvResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.pvData],
        queryFn: () => hems.pvData(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const {
        isLoading: isBuildDataLoading,
        error: buildDataError,
        data: buildResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.buildData],
        queryFn: () => hems.buildData(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const integratedChartConfig = produce(initialIntegratedChartConfig, draft => {
        if (essResultData && pvResultData && buildResultData) {
            const essTimeList = essResultData.resultData.essTimeList
            const essChargeEnergy = essTimeList.map((item) => item.chargeEnergy)
            const essDisChargeEnergy = essTimeList.map((item) => -item.dischargeEnergy)

            const pvEnergy = pvResultData.resultData.pvTimeList.map((item) => item.energy)

            const buildEnergy = buildResultData.resultData.buildTimeList.map((item) => item.energy)

            draft.data.datasets[0].data = essChargeEnergy
            draft.data.datasets[1].data = essDisChargeEnergy
            draft.data.datasets[2].data = buildEnergy
            draft.data.datasets[3].data = pvEnergy
        }
    })

    /**
     * 시간대별 EV 충전기 연결 현황 차트 (Boxplot Chart)
     */
    const {
        isLoading: isEvConnectionDataLoading,
        error: evConnectionDataError,
        data: evConnectionResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.evConnectionStatus],
        queryFn: () => hems.evConnectionStatsData(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const evConnectionChartConfig = produce(initialEvConnectionChartConfig, draft => {
        if(evConnectionResultData){
            const evConnStatus = evConnectionResultData.resultData.evTimeList.map(item => {
                return {
                    min: item.minTime || 0,
                    median: item.avgTime || 0,
                    max: item.maxTime || 0,
                    q1: item.minTime + (item.avgTime - item.minTime) / 2 || 0,
                    q3: item.avgTime + (item.maxTime - item.avgTime) / 2 || 0,
                }
            })

            const evCnt =  evConnectionResultData.resultData.evTimeList.map(item => item.cnt)

            draft.data.datasets[0].data = evConnStatus
            draft.data.datasets[1].data = evCnt
        }
    })

    if (isEssDataLoading || isPvDataLoading || isBuildDataLoading || isEvConnectionDataLoading) {
        return <Loading />
    }
    
    if (essDataError || pvDataError || buildDataError || evConnectionDataError) {
        return <Error error={{ essDataError, pvDataError, buildDataError, evConnectionDataError }} />
    }

    return (
        <div>
            <h1>사이트 현황</h1>
            <PowerCard title={'건물 전력량'} kwValue={'123kwh'} description={'detail'} img={FaBeer}/>
            {integratedChartConfig?.data?.datasets?.length > 0 && (
                <CustomChart
                    chartTitle={'사이트 현황 - 통합'}
                    data={integratedChartConfig.data}
                    options={integratedChartConfig.options}
                />
            )}
            {evConnectionResultData && (
                <BoxplotChart
                    chartTitle={'시간대별 EV 충전기 연결 현황'}
                    data={evConnectionChartConfig.data}
                    options={evConnectionChartConfig.options}
                />
            )}
        </div>
    )
}
