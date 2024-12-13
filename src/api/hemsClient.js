import axios from 'axios'

export default class HemsClient {
    constructor() {
        this.httpClient = axios.create({
            baseURL: '/',
            headers: {
                Accept: 'application/json', // JSON 요청 명시
                'Content-Type': 'application/json', // POST/PUT 시 필요
            },
        })
    }
    
    /* 현황 페이지 APIs... */
    /** 
        사이트 현황 APIs
    */
    async essData() {
        const tmpParam = {
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeqList: [],
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/siteStats/getEssData', tmpParam)
    }

    async evData() {
        const tmpParam = {
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeqList: [],
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/siteStats/getEvData', tmpParam)
    }

    async pvData() {
        const tmpParam = {
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeqList: [],
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/siteStats/getPvData', tmpParam)
    }

    async buildData() {
        const tmpParam = {
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeqList: [],
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/siteStats/getBuildData', tmpParam)
    }

    async evConnectionStatsData() {
        const tmpParam = {
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeqList: [],
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/siteStats/getEvConnectionStatsData', tmpParam)
    }

    /** 
        건물 현황 APIs 
    */
    async buildingTotalInfo(params) {
        const tmpParam = {
            buildingSeq: '',
            buildingSeqList: [],
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeq: '',
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/buildingStats/getBuildingTotalInfo', tmpParam)
    }

    async buildingStats(params) {
        const tmpParam = {
            buildingSeq: '',
            buildingSeqList: [],
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeq: '',
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/buildingStats/getBuildingStatus', tmpParam)
    }

    async consumeRecvPower(params) {
        const tmpParam = {
            buildingSeq: '',
            buildingSeqList: [],
            dateDiff: '',
            dateType: 'day',
            endDate: '',
            resourceType: 'R',
            siteSeq: '',
            startDate: '2024-11-06',
        }
        return this.httpClient.post('/api/buildingStats/getConsumeRecvPower', tmpParam)
    }

    async buildingStatusList(params) {
        const tmpParam = {
            buildingName: '',
            buildingSeq: '',
            page: 1,
            resourceType: 'R',
            siteName: '',
            siteSeq: '',
        }
        return this.httpClient.post('/api/buildingStats/getBuildingList', tmpParam)
    }

    /* 관리 페이지 APIs... */
    /** 
        사이트 관리 APIs 
    */
    async siteList(params) {
        const tmpParam = {
            page: 1,
            siteName: '',
        }
        return this.httpClient.post('/api/site/siteList', tmpParam)
    }


    /** 
        전기 요금제 관리 APIs 
    */
    async epChartData(params) {
        const tmpParam = {
            dateType: 'day',
            epSeq: '2',
        }
        return this.httpClient.post('/api/eprice/epChartData', tmpParam)
    }
}
