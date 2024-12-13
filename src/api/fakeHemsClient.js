import axios from 'axios'

export default class FakeHemsClient {
    constructor() {

    }

    /* 현황 페이지 APIs... */
    /** 
        사이트 현황 APIs
    */
    async essData() {
        return axios.get('/data/status/getEssData.json')
    }
    async evData() {
        return axios.get('/data/status/getEvData.json')
    }
    async pvData() {
        return axios.get('/data/status/getPvData.json')
    }
    async buildData() {
        return axios.get('/data/status/getBuildData.json')
    }
    async evConnectionStatsData() {
        return axios.get('/data/status/getEvConnectionStatsData.json')
    }

    /** 
        건물 현황 APIs 
    */
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
