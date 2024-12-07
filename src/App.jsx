import { useEffect } from 'react'
import { LNB } from './components/common/LNB'
import { Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { HemsApiProvider } from './context/HemsApiContext'

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
            <HemsApiProvider>
                <LNB />
                <Outlet />
            </HemsApiProvider>
        </>
    )
}

export default App
