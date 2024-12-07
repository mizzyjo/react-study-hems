import { useEffect } from 'react'
import { LNB } from './components/common/LNB'
import { Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { HemsApiProvider } from './context/HemsApiContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    let navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname === '/') {
            navigate('/dashboard')
        }
    }, [])

    return (
        <>
        <QueryClientProvider client={queryClient}>
            <HemsApiProvider>
                <LNB />
                <Outlet />
            </HemsApiProvider>
        </QueryClientProvider>
        </>
    )
}

export default App
