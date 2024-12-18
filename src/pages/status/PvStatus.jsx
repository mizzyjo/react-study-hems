import React from 'react'
import { useHemsApi } from '../../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'

export default function PvStatus() {
    const { hems } = useHemsApi()

    const {
        isLoading: isPodPowerDataLoading,
        error: prodPowerDataError,
        data: prodPowerResultData,
    } = useQuery({
        queryKey: ['prodPower'],
        queryFn: () => hems.prodPower(),
        staleTime: 1000 * 60 * 1,
    })
    
    return (
        <div>
            
        </div>
    )
}

