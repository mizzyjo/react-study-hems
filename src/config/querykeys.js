// Tanstack Query 키

export const QUERY_KEYS = {
    // 사이트 현황
    essData: 'essData',
    pvData: 'pvData',
    buildData: 'buildData',
    evConnectionStatus: 'evConnectionStatus',

    // 빌딩 현황
    buildingTotalInfo: 'buildingTotalInfo',
    buildingStats: 'buildingStats',
    consumeRecvPower: 'consumeRecvPower',
    buildingStatusList: 'buildingStatusList',

    // 전기 요금제 관리
    epriceByDay: 'epriceByDay',
    epriceByYear: 'epriceByYear',

    // 사이트 관리
    siteList: 'siteList',
}

/** 사용 예
    queryKey: [QUERY_KEYS.priceByDay]
*/