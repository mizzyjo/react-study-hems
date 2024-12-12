import axios from 'axios'

export default class FakeHemsClient {
    constructor() {

    }

    async buildingTotalInfo() {
        return axios.get('/data/getBuildingTotalInfo.json')
    }

    async buildingStats() {
        return axios.get('/data/getBuildingStats.json')
    }

    async consumeRecvPower() {
        return axios.get('/data/getConsumeRecvPower.json')
    }
}
