import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import SiteMgmt from './pages/management/SiteMgmt'
import SiteStatus from './pages/status/SiteStatus'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import TestPage from './pages/TestPage'
import BuildingMgmt from './pages/management/BuildingMgmt'
import BuildingStatus from './pages/status/BuildingStatus'
import SiteStatusTestPage from './pages/SiteStatusTestPage'
import Eprice from './pages/eprice/Eprice'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/sitemgmt',
                element: <SiteMgmt />,
            },
            {
                path: '/buildingmgmt',
                element: <BuildingMgmt />
            },
            {
                path: '/sitestatus',
                element: <SiteStatus />,
            },
            {
                path: '/buildingstatus',
                element: <BuildingStatus />
            },
            {
                path: '/eprice',
                element: <Eprice />,
            },
            {
                path: '/test',
                element: <TestPage />,
            },
            {
                path: '/sitestatustest',
                element: <SiteStatusTestPage />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
