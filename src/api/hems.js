export default class Hems {
    constructor(apiClient) {
        this.apiClient = apiClient
    }

    async essData() {
        return this.#getEssData()
    }

    async evData() {
        return this.#getEvData()
    }

    async pvData() {
        return this.#getPvData()
    }

    async buildData() {
        return this.#getBuildData()
    }

    async evConnectionStatsData() {
        return this.#getEvConnectionStatsData()
    }

    async prodPower() {
        return this.#getProdPower()
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

    async buildingStatusList() {
        return this.#getBuildingStatusList()
    }

    async siteList() {
        return this.#getSiteList()
    }

    async epChartDataByDay() {
        return this.#getEpChartDataByDay()
    }

    async epChartDataByYear() {
        return this.#getEpChartDataByYear()
    }

    async #getEssData() {
        return this.apiClient
            .essData()
            .then(res => {
                console.log('res.data essData', res.data)
                return res.data
            })
    }

    async #getEvData() {
        return this.apiClient
            .evData()
            .then(res => {
                console.log('res.data evData', res.data)
                return res.data
            })
    }

    async #getPvData() {
        return this.apiClient
            .pvData()
            .then(res => {
                console.log('res.data pvData', res.data)
                return res.data
            })
    }

    async #getBuildData() {
        return this.apiClient
            .buildData()
            .then(res => {
                console.log('res.data buildData', res.data)
                return res.data
            })
    }

    async #getEvConnectionStatsData() {
        return this.apiClient
        .evConnectionStatsData()
        .then(res => {
            console.log('res.data evConnectionStatsData', res.data)
            return res.data
        })
    }

    async #getProdPower() {
        return this.apiClient
            .prodPower()
            .then(res => {
                console.log('res.data prodPower', res.data)
                return res.data
            })
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

    async #getBuildingStatusList() {
        return this.apiClient
            .buildingStatusList()
            .then(res => {
                console.log('res.data3', res.data)
                return res.data
            })
    }

    async #getSiteList() {
        return this.apiClient
            .siteList()
            .then(res => {
                console.log('res.data siteList', res.data)
                return res.data
            })
    }

    async #getEpChartDataByDay() {
        return this.apiClient
            .epChartDataByDay()
            .then(res => {
                console.log('res.data epChartData(D)', res.data)
                return res.data
            })
    }

    async #getEpChartDataByYear() {
        return this.apiClient
            .epChartDataByYear()
            .then(res => {
                console.log('res.data epChartData(Y)', res.data)
                return res.data
            })
    }

}
