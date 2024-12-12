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
}
