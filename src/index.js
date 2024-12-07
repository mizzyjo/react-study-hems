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
                path: '/sitestatus',
                element: <SiteStatus />,
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
