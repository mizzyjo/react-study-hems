import React from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, STALE_TIME } from '../../config/queryConfig'
import { CustomChart } from '../../components/common/CustomChart'
import { initialChartConfig, chartTimeLabels } from '../../config/pvStatusChart'
import { produce } from 'immer'
import { Loading } from '../../components/common/Loading'
import { Error } from '../../components/common/Error'

export default function PvStatus() {
    const { hems } = useHemsApi()

    const {
        isLoading: isProdPowerDataLoading,
        error: prodPowerDataError,
        data: prodPowerResultData,
    } = useQuery({
        queryKey: [QUERY_KEYS.prodPower],
        queryFn: () => hems.prodPower(),
        staleTime: STALE_TIME.ONE_MINUTE,
    })

    const chartConfig = produce(initialChartConfig, draft => {
        if (prodPowerResultData) {
            const prodPower = prodPowerResultData.resultData.pvList.map(item => item.power) || []
            draft.data.datasets[0].data = prodPower
        }
    })

    if (prodPowerResultData) {
        const time = prodPowerResultData.resultData.pvList.map(item => item.time) || []
        time.forEach((value, index) => {
            chartTimeLabels[index] = value
        })
    }

    if (isProdPowerDataLoading) {
        return <Loading />
    }

    if (prodPowerDataError) {
        return <Error error={prodPowerDataError} />
    }

    return (
        <div>
            <CustomChart chartTitle={'발전 출력 그래프 (kW)'} data={chartConfig.data} options={chartConfig.options}/>
        </div>
    )
}
