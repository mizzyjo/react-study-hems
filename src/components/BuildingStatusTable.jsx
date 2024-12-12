import React from 'react'

export const BuildintStatusTable = ({ rowNmdata, data }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {rowNmdata.map((item, idx) => {
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
        </>
    )
}
