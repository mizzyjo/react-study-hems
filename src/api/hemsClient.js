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

    async buildingStats(params) {
        return this.httpClient.get('/stats/buildingStats', params)
    }

    async consumeRecvPower() {
        // TODO: api 주소 매핑시키기
        return this.httpClient.get('/...', params)
    }
}
