export default class Hems {
    constructor(apiClient) {
        this.apiClient = apiClient
    }

    async buildingTotalInfo() {
        return this.#getBuildingTotlaInfo()
    }

    async buildingStats() {
        return this.#getBuildingStats()
    }
    
    async consumeRecvPower() {
        return this.#getConsumeRecvPower()
    }

    async buildingList() {
        return this.#getBuildingList()
    }

    async #getBuildingTotlaInfo() {
        return this.apiClient
            .buildingTotalInfo()
            .then(res => {
                console.log('res.data0', res.data)
                return res.data
            })
    }

    async #getBuildingStats(payload) {
        return this.apiClient
            .buildingStats()
            .then(res => {
                console.log('res.data', res.data)
                return res.data
            })
    }

    async #getConsumeRecvPower() {
        return this.apiClient
            .consumeRecvPower()
            .then(res => {
                console.log('res.data2', res.data)
                return res.data
            })
    }

    async #getBuildingList() {
        return this.apiClient
            .buildingList()
            .then(res => {
                console.log('res.data3', res.data)
                return res.data
            })
    }

    // async #getBuildingStats(payload) {
    //     return this.apiClient
    //         .buildingStats({
    //             buildingSeq: '',
    //             buildingSeqList: [],
    //             dateDiff: '',
    //             dateType: 'day',
    //             endDate: '',
    //             resourceType: 'R',
    //             siteSeq: '',
    //             startDate: '2024-11-06',
    //         })
    //         .then(res => {
    //             console.log('res.data', res.data)
    //         })
    // }
}
