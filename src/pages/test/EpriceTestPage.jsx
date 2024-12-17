import React, { useEffect, useState } from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { CustomChart } from '../../components/common/CustomChart'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'
import { QUERY_KEYS } from '../../config/querykeys'

export default function EpriceTestPage() {
    const { hems } = useHemsApi()

    const [selectedChart, setSelectedChart] = useState('day')
    const [chartConfigByDay, setChartConfigByDay] = useState(initialChartConfigByDay)
    const [chartConfigByYear, setChartConfigByYear] = useState(initialChartConfigByYear)

    const {
        isLoading: isPriceByDayDataLoading,
        error: priceByDayDataError,
        data: priceByDayResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.epriceByDay],
        queryFn: () => hems.epChartDataByDay(),
        staleTime: 1000 * 60 * 1,
    })

    const {
        isLoading: isPriceByYearDataLoading,
        error: priceByYearDataError,
        data: priceByYearResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.epriceByYear],
        queryFn: () => hems.epChartDataByYear(),
        staleTime: 1000 * 60 * 1,
    })

    useEffect(() => {
        if (priceByDayResultData && priceByYearResultData) {
            const epChartListByDay = priceByDayResultData.resultData.epChartList.map(item => item.recvPrice)
            const highRecvPrice = priceByYearResultData.resultData.epChartList.map(item => item.highRecvPrice)
            const midRecvPrice = priceByYearResultData.resultData.epChartList.map(item => item.midRecvPrice)
            const lowRecvPrice = priceByYearResultData.resultData.epChartList.map(item => item.lowRecvPrice)

            setChartConfigByDay(
                produce(chartConfigByDay, draft => {
                    draft.data.datasets[0].data = epChartListByDay
                }),
            )

            setChartConfigByYear(
                produce(chartConfigByYear, draft => {
                    draft.data.datasets[0].data = highRecvPrice
                    draft.data.datasets[1].data = midRecvPrice
                    draft.data.datasets[2].data = lowRecvPrice
                }),
            )
        }
    }, [priceByDayResultData, priceByYearResultData])

    const handleSelectedChart = (e) => {
        setSelectedChart(e.target.value)
    }

    if (isPriceByDayDataLoading || isPriceByYearDataLoading) {
        return <Loading />
    } else if (priceByDayDataError || priceByYearDataError) {
        const error = {
            priceByDayDataError,
            priceByYearDataError
        }
        return <Error error={error}/>
    }

    return (
        <div>
            <h1>전기 요금제 관리</h1>
            <select name="epChart" id="epChart" onChange={handleSelectedChart}>
                <option value="day">일</option>
                <option value="year">년</option>
            </select>
            {selectedChart === 'day' ? (
                <CustomChart key="byDay" data={chartConfigByDay.data} options={chartConfigByDay.options} />
            ) : (
                <CustomChart key="byYear" data={chartConfigByYear.data} options={chartConfigByYear.options} />
            )}
        </div>
    )
}

const initialChartConfigByYear = {
    data: {
        labels: Array.from({ length: 12 }, (_, i) => `${String(i + 1)}월`),
        datasets: [
            {
                type: 'line',
                label: '경부하',
                data: Array(24).fill(0), // 기본값으로 0으로 채운 배열 세팅
                backgroundColor: '#A7C7E7',
                borderColor: '#A7C7E7',
                borderWidth: 3,
            },
            {
                type: 'line',
                label: '중부하',
                data: Array(24).fill(0),
                backgroundColor: '#A2D5AB',
                borderColor: '#A2D5AB',
                borderWidth: 3,
            },
            {
                type: 'line',
                label: '최대부하',
                data: Array(24).fill(0),
                backgroundColor: '#D8B4E2',
                borderColor: '#D8B4E2',
                borderWidth: 3,
            },
        ],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: context => {
                        const data = context.raw
                        return `전기 요금: ${data} 원/kWh`
                    },
                },
            },
        },
    },
}

const initialChartConfigByDay = {
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                type: 'line',
                label: '전기요금',
                data: [1, 1, 2, 3, 1, 4, 5],
                backgroundColor: '#F9D5A7',
                borderColor: '#F9D5A7',
                borderWidth: 3,
                stepped: true,
            },
        ],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const data = context.raw
                        return `전기 요금: ${data} 원/kWh`
                    },
                },
            },
        },
    },
}
