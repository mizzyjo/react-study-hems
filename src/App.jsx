import { useEffect } from 'react'
import { LNB } from './components/common/LNB'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router'
function App() {
    let navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard')
    }, [])
    
    return (
        <>
            <LNB />
            <Outlet />
        </>
    )
}

export default App
