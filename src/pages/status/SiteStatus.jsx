import React, { useEffect, useState } from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { CustomChart } from '../../components/common/CustomChart'
import { FaBeer } from "react-icons/fa"
import PowerCard from '../../components/common/PowerCard'
import { BoxplotChart } from '../../components/common/BoxplotChart'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'
import { initialIntegratedChartConfig, initialEvConnectionChartConfig } from '../../config/siteStatusChart'

export default function SiteStatus() {
    const { hems } = useHemsApi()

    const [chartConfig, setChartConfig] = useState(initialIntegratedChartConfig)

    // ESS 충방전량
    const {
        isLoading: isEssDataLoading,
        error: essDataError,
        data: essResultData,
    } = useQuery({
        queryKey: ['essData'],
        queryFn: () => hems.essData(),
        staleTime: 1000 * 60 * 1,
    })

    // PV 발전량
    const {
        isLoading: isPvDataLoading,
        error: pvDataError,
        data: pvResultData,
    } = useQuery({
        queryKey: ['pvData'],
        queryFn: () => hems.pvData(),
        staleTime: 1000 * 60 * 1,
    })

    const {
        isLoading: isBuildDataLoading,
        error: buildDataError,
        data: buildResultData,
    } = useQuery({
        queryKey: ['buildData'],
        queryFn: () => hems.buildData(),
        staleTime: 1000 * 60 * 1,
    })

    useEffect(() => {
        if(!isEssDataLoading && !isPvDataLoading && !isBuildDataLoading){
            const essTimeList = essResultData.resultData.essTimeList
            const essChargeEnergy = essTimeList.map((item, idx) => item.chargeEnergy)
            const essDisChargeEnergy = essTimeList.map((item, idx) => -item.dischargeEnergy)

            const pvTimeList = pvResultData.resultData.pvTimeList
            const pvEnergy = pvTimeList.map((item) => item.energy)

            const buildTimeList = buildResultData.resultData.buildTimeList
            const buildEnergy = buildTimeList.map((item) => item.energy)

            setChartConfig(
                produce(chartConfig, darft => {
                    darft.data.datasets[0].data = essChargeEnergy
                    darft.data.datasets[1].data = essDisChargeEnergy
                    darft.data.datasets[2].data = buildEnergy
                    darft.data.datasets[3].data = pvEnergy
                })
            )
        }
    }, [isEssDataLoading, isPvDataLoading, isBuildDataLoading])

    // 시간대별 EV 충전기 연결 현황 그래프(boxplot chart 그리기)
    const {
        isLoading: isEvConnectionDataLoading,
        error: evConnectionDataError,
        data: evConnectionResultData,
    } = useQuery({
        queryKey: ['evConnectionStatus'],
        queryFn: () => hems.evConnectionStatsData(),
        staleTime: 1000 * 60 * 1,
    })

    const [boxplotConfig, setBoxplotConfig] = useState(initialEvConnectionChartConfig)


    useEffect(() => {
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
            
            setBoxplotConfig(
                produce(boxplotConfig, darft => {
                    darft.data.datasets[0].data = evConnStatus
                    darft.data.datasets[1].data = evCnt
                })
            )

        }
    }, [evConnectionResultData])


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
            {chartConfig?.data?.datasets?.length > 0 && (
                <CustomChart
                    chartTitle={'사이트 현황 - 통합'}
                    data={chartConfig.data}
                    options={chartConfig.options}
                />
            )}
            {evConnectionResultData && (
                <BoxplotChart
                    chartTitle={'시간대별 EV 충전기 연결 현황'}
                    data={boxplotConfig.data}
                    options={boxplotConfig.options}
                />
            )}
        </div>
    )
}
