import React from 'react'
import HemsClient from '../api/hemsClient'
import FakeHemsClient from '../api/fakeHemsClient'
import Hems from '../api/hems'

export default function TestClient() {
    // const client = new HemsClient()
    const client = new FakeHemsClient()
    const hems = new Hems(client)

    return (
        <div>
            <p>hi</p>
        </div>
    )
}
