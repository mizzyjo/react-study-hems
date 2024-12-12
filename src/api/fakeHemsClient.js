import axios from 'axios'

export default class FakeHemsClient {
    constructor() {

    }

    /* 현황 페이지 APIs... */
    async buildingTotalInfo() {
        return axios.get('/data/status/getBuildingTotalInfo.json')
    }

    async buildingStats() {
        return axios.get('/data/status/getBuildingStats.json')
    }

    async consumeRecvPower() {
        return axios.get('/data/status/getConsumeRecvPower.json')
    }

    async buildingStatusList() {
        return axios.get('/data/status/getBuildingList.json')
    }

    /* 관리 페이지 APIs... */

}
