import React, { useEffect, useState } from 'react'
import { useHemsApi } from '../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { MixedChart } from '../components/common/MixedChart'

export default function SiteStatusTestPage() {
    const { hems } = useHemsApi()

    const [chartConfig, setChartConfig] = useState(initialChartConfig)

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

    return (
        <div>
            <h1>SiteStatus Test Page</h1>
            {essDataError || pvDataError ? (
                <p style={{ color: 'red' }}>데이터를 불러오는 중 오류가 발생했습니다.</p>
            ) : isEssDataLoading || isPvDataLoading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                chartConfig?.data?.datasets?.length > 0 && (
                        <MixedChart
                            chartTitle={'사이트 현황 - 통합'}
                            data={chartConfig.data}
                            options={chartConfig.options}
                        />
                )
            )}
        </div>
    )
}


// Stacked BarChart Config : Mixed Chart
const initialChartConfig = {
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                type: 'bar',
                label: 'ESS충전',
                data: Array(24).fill(0), // 기본값으로 0으로 채운 배열 세팅
                backgroundColor: '#FF6083',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'bar',
                label: 'ESS방전',
                data: Array(24).fill(0),
                backgroundColor: '#38A2E7',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'bar',
                label: '건물',
                data: Array(24).fill(0),
                backgroundColor: '#FCAE34',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'line',
                label: 'PV발전량',
                data: Array(24).fill(0),
                backgroundColor: '#4BC1C2',
                borderColor: '#4FBEBE',
                borderWidth: 8,
                order: 1,
            },
        ],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    },
}



/**
    * 알아두기
    1. Immer의 produce를 각각 다른 useEffect에서 사용하면 적용 안될 수도 있음
        - 첫 번재 useEffect 에서
                    darft.data.datasets[0].data = essChargeEnergy
                    darft.data.datasets[1].data = essDischargeEnergy
          두 번째 useEffect 에서
                    darft.data.datasets[2].data = pvEnergy
          업데이트 할 경우, 첫 번째 useEffect 코드 적용 안 됨
 */