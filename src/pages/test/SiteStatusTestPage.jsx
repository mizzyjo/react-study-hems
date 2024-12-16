import React, { useEffect, useState } from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { CustomChart } from '../../components/common/CustomChart'
import { FaBeer } from "react-icons/fa";
import PowerCard from '../../components/common/PowerCard'
import { BoxplotChart } from '../../components/common/BoxplotChart'
import { Loading } from '../../components/common/Loading'

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

    const [boxplotConfig, setBoxplotConfig] = useState(initialBoxPlotConfig)


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

    if(isEvConnectionDataLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>SiteStatus Test Page</h1>
            <PowerCard title={'건물 전력량'} kwValue={'123kwh'} description={'detail'} img={FaBeer}/>
            {essDataError || pvDataError ? (
                <p style={{ color: 'red' }}>데이터를 불러오는 중 오류가 발생했습니다.</p>
            ) : isEssDataLoading || isPvDataLoading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                chartConfig?.data?.datasets?.length > 0 && (
                        <CustomChart
                            chartTitle={'사이트 현황 - 통합'}
                            data={chartConfig.data}
                            options={chartConfig.options}
                        />
                )
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


// Stacked BarChart Config : Mixed Chart
const initialChartConfig = {
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                type: 'bar',
                label: 'ESS충전',
                data: Array(24).fill(0), // 기본값으로 0으로 채운 배열 세팅
                backgroundColor: '#C73C3D',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'bar',
                label: 'ESS방전',
                data: Array(24).fill(0),
                backgroundColor: '#4C5AD6',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'bar',
                label: '건물',
                data: Array(24).fill(0),
                backgroundColor: '#FFAF36',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'line',
                label: 'PV발전량',
                data: Array(24).fill(0),
                backgroundColor: '#535CD9',
                borderColor: '#535CD9',
                borderWidth: 5,
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

const initialBoxPlotConfig = {
    type: 'boxplot',
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                label: '시간',
                data: [],
                backgroundColor: '#4C5CD2',
                borderColor: '#4C5CD2',
                borderWidth:3,
                order: 2,
                yAxisID: 'y-left', // 첫 번째 데이터셋은 왼쪽 y축을 사용
            },
            {
                type: 'line',
                label: 'EV 차량',
                data: Array(24).fill(0),
                backgroundColor: '#08A2CA',
                borderColor: '#08A2CA',
                borderWidth: 3,
                order: 1,
                yAxisID: 'y-right', // 두 번째 데이터셋은 오른쪽 y축을 사용
            },
        ],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Box',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const data = context.raw
                        if ( context.dataset.label === '시간') {
                            return ` 최소: ${data.min}분 / 평균: ${data.median}분 / 최대: ${data.max}분`
                        } else {
                            return ` EV 차량: ${data}`
                        }
                    },
                },
                
            },
        },
        responsive: true,
        scales: {
             // x축 타이틀 설정
             x: {
                title: {
                    display: true,
                    text: '시간',
                    // align: 'start', // 타이틀 왼쪽 정렬
                },
            },
            // y축을 오른쪽에 세팅
            'y-right': {
                // stacked: true,
                position: 'right',
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