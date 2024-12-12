import axios from 'axios'

export default class FakeHemsClient {
    constructor() {

    }

    async buildingTotalInfo() {
        return axios.get('/data/status/getBuildingTotalInfo.json')
    }

    async buildingStats() {
        return axios.get('/data/status/getBuildingStats.json')
    }

    async consumeRecvPower() {
        return axios.get('/data/status/getConsumeRecvPower.json')
    }

    async buildingList() {
        return axios.get('/data/status/getBuildingList.json')
    }
}
