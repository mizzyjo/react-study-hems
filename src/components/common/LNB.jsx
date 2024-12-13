import React from 'react'
import { Link } from "react-router"

export const LNB = props => (
    <header>
        <ul>
            <li>
                테스트 페이지
                <ul>
                    <li>
                        <Link to="/sitestatustest">사이트 현황 TEST PAGE</Link>
                    </li>
                    <li>
                        <Link to="/test">빌딩 현황 TEST PAGE</Link>
                    </li>
                </ul>
            </li>
            <li>
                현황
                <ul>
                    <li>
                        <Link to="/sitestatus">사이트 현황</Link>
                    </li>
                    <li>
                        <Link to="/buildingstatus">건물 현황</Link>
                    </li>
                </ul>
            </li>
            <li>
                관리
                <ul>
                    <li>
                        <Link to="/sitemgmt">사이트 관리</Link>
                    </li>
                    <li>
                        <Link to="/buildingmgmt">건물 관리</Link>
                    </li>
                </ul>
            </li>
        </ul>
    </header>
)
