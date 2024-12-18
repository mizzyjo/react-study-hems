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
        PV 현황 APIs 
    */
    async prodPower() {
        // 운영에서만 확인할 수 있는 데이터
        return axios.get('/data/status/getProdPower.json')
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
    /** 
        사이트 관리 APIs 
    */
    async siteList() {
        return axios.get('/data/management/siteList.json')
    }

    /* 전기 요금제 관리 페이지 APIs... */
    async epChartDataByDay() {
        return axios.get('/data/eprice/epChartDataByDay.json')
    }
    
    async epChartDataByYear() {
       return axios.get('/data/eprice/epChartDataByYear.json')
    }
}
