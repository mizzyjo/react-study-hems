import React from 'react'

export const SiteMgmtTable = ({ data }) => {
    return (
        <table>
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
                            <td>{item.siteName}</td>
                            <td>{item.resourceType}</td>
                            <td>{`${item.sido} ${item.gugun} ${item.address}`}</td>
                            <td>{item.toupName}</td>
                            <td>{item.regDttmKst}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const columnHeaders = [
    '사이트',
    '자원 타입',
    '주소',
    '요금제',
    '등록일',
]