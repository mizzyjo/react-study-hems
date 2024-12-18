import { createContext, useContext } from 'react'
import FakeHemsClient from '../api/fakeHemsClient'
import hemsClient from '../api/hemsClient'
import Hems from '../api/hems'

const HemsApiContext = createContext()

const client = new hemsClient()
// const client = new FakeHemsClient()

const hems = new Hems(client)

export function HemsApiProvider({ children }) {
    return <HemsApiContext.Provider value={{ hems }}>{children}</HemsApiContext.Provider>
}

export function useHemsApi() {
    return useContext(HemsApiContext)
}
