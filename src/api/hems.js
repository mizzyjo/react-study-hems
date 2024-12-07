export default class Hems {
    constructor(apiClient) {
        this.apiClient = apiClient
    }

    async buildingStats() {
        return this.#getBuildingStats()
    }

    async #getBuildingStats(payload) {
        return this.apiClient.buildingStats({
            buildingSeq: "",
            buildingSeqList: [],
            dateDiff: "",
            dateType: "day",
            endDate: "",
            resourceType: "R",
            siteSeq: "",
            startDate: "2024-11-06"
        }).then((res) => {
            console.log('res.data', res.data)
        })
    }


}

