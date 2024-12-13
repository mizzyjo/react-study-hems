import React from 'react'

export const BuildintStatusTable = ({ data }) => {
    return (
        <table>
            <caption>{tableTitle}</caption>
            <thead>
                <tr>
                    {columnHeaders.map((item, idx) => {
                        return <th key={idx}>{item}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.buildingName}</td>
                            <td>{item.siteName}</td>
                            <td>{item.recvPower}</td>
                            <td>{item.nowRecvPower}</td>
                            <td>{item.prevRecvPower}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const tableTitle = '유닛리스트'

const columnHeaders = [
    '건물명',
    '사이트',
    '소비전력',
    '(일)최대부하(kW)',
    '최근 13개월 최대부하 (kW)',
]