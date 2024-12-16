import React from 'react'

export const Error = ({ error }) => (
    <>
        <p>데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요..</p>
        {console.log('error:: ', error)}
    </>
)
