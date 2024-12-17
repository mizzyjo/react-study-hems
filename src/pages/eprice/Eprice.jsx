import React, { useEffect, useState } from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { CustomChart } from '../../components/common/CustomChart'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'
import { QUERY_KEYS, STALE_TIME } from '../../config/queryConfig'
import { initialChartConfigByDay, initialChartConfigByYear } from '../../config/epriceChart'

export default function Eprice() {
    const { hems } = useHemsApi()

    const [selectedOption, setSelectedOption] = useState('day')

    const {
        isLoading: isPriceByDayDataLoading,
        error: priceByDayDataError,
        data: priceByDayResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.epriceByDay],
        queryFn: () => hems.epChartDataByDay(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const chartConfigByDay = produce(initialChartConfigByDay, draft => {
        if (priceByDayResultData) {
            draft.data.datasets[0].data = priceByDayResultData.resultData.epChartList.map(item => item.recvPrice)
        }
    })

    const {
        isLoading: isPriceByYearDataLoading,
        error: priceByYearDataError,
        data: priceByYearResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.epriceByYear],
        queryFn: () => hems.epChartDataByYear(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const chartConfigByYear = produce(initialChartConfigByYear, draft => {
        if (priceByYearResultData) {
            draft.data.datasets[0].data = priceByYearResultData.resultData.epChartList.map(item => item.highRecvPrice)
            draft.data.datasets[1].data = priceByYearResultData.resultData.epChartList.map(item => item.midRecvPrice)
            draft.data.datasets[2].data = priceByYearResultData.resultData.epChartList.map(item => item.lowRecvPrice)
        }
    })

    const handleSelectedChart = (e) => {
        setSelectedOption(e.target.value)
    }

    if (isPriceByDayDataLoading || isPriceByYearDataLoading) {
        return <Loading />
    }
    
    if (priceByDayDataError || priceByYearDataError) {
        return <Error error={{ priceByDayDataError, priceByYearDataError }} />
    }

    return (
        <div>
            <h1>전기 요금제 관리</h1>
            <select aria-label="요금제 선택" name="epChart" id="epChart" onChange={handleSelectedChart}>
                <option value="day">일</option>
                <option value="year">년</option>
            </select>
            {selectedOption === 'day' ? (
                <CustomChart key="byDay" data={chartConfigByDay.data} options={chartConfigByDay.options} />
            ) : (
                <CustomChart key="byYear" data={chartConfigByYear.data} options={chartConfigByYear.options} />
            )}
        </div>
    )
}
