import React, { useEffect } from 'react'
import TestClient from '../components/demo/TestClient'
import TestChart2 from '../components/demo/TestChart2'
import { useHemsApi } from '../context/HemsApiContext'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function TestPage() {
    const { hems } = useHemsApi()
    const keyword = 'building'
    useEffect(() => {
        console.log('test page: ', hems.buildingStats())
    }, [])

    const {
        isLoading,
        error,
        data,
    } = useQuery({
        queryKey: ['buildingStats'],
        queryFn: () => hems.buildingStats(keyword),
        staleTime: 1000 * 60 * 1,
    })

    console.log('tanstack: ', isLoading, data)

    return (
        <div>
            <h1>Test Page</h1>
            <TestChart2/>
            <TestClient />
        </div>
    )
}
