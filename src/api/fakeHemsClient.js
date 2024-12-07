import axios from 'axios'

export default class FakeHemsClient {
    async buildingStats() {
        return axios.get('/data/getBuildingStats.json')
    }
}
