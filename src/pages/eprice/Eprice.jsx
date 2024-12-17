import React, { useEffect, useState } from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { CustomChart } from '../../components/common/CustomChart'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'
import { QUERY_KEYS } from '../../config/querykeys'
import { initialChartConfigByDay, initialChartConfigByYear } from '../../config/epriceChart'

export default function Eprice() {
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
        if (priceByDayResultData) {
            const epChartListByDay = priceByDayResultData.resultData.epChartList.map(item => item.recvPrice)
            setChartConfigByDay(produce(chartConfigByDay, draft => {
                draft.data.datasets[0].data = epChartListByDay
            }))
        }
    }, [priceByDayResultData])
    
    useEffect(() => {
        if (priceByYearResultData) {
            const highRecvPrice = priceByYearResultData.resultData.epChartList.map(item => item.highRecvPrice)
            const midRecvPrice = priceByYearResultData.resultData.epChartList.map(item => item.midRecvPrice)
            const lowRecvPrice = priceByYearResultData.resultData.epChartList.map(item => item.lowRecvPrice)
    
            setChartConfigByYear(produce(chartConfigByYear, draft => {
                draft.data.datasets[0].data = highRecvPrice
                draft.data.datasets[1].data = midRecvPrice
                draft.data.datasets[2].data = lowRecvPrice
            }))
        }
    }, [priceByYearResultData])

    const handleSelectedChart = (e) => {
        setSelectedChart(e.target.value)
    }

    if (isPriceByDayDataLoading || isPriceByYearDataLoading) {
        return <Loading />
    } else if (priceByDayDataError || priceByYearDataError) {
        return <Error error={{ priceByDayDataError, priceByYearDataError }} />
    }

    return (
        <div>
            <h1>전기 요금제 관리</h1>
            <select aria-label="요금제 선택" name="epChart" id="epChart" onChange={handleSelectedChart}>
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
