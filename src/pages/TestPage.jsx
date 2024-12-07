import React, { useEffect } from 'react'
import TestClient from '../components/demo/TestClient'
import { useHemsApi } from '../context/HemsApiContext'

export default function TestPage() {
    const { hems } = useHemsApi()
    useEffect(() => {
        console.log('test page: ', hems.buildingStats())
    }, [])
    return (
        <div>
            <h1>Test Page</h1>
            <TestClient />
        </div>
    )
}
