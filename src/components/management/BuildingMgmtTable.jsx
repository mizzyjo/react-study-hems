import React from 'react'

export const BuildingMgmtTable = ({ data }) => {
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
                            <td>{item.buildingName}</td>
                            <td>{item.resourceType}</td>
                            <td>{item.siteName}</td>
                            <td>{item.regDttmKst}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const columnHeaders = [
    '건물명',
    '자원 타입',
    '사이트',
    '등록일',
]
