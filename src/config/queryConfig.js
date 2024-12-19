// Tanstack Query 관련 Config 파일

export const QUERY_KEYS = {
    // 사이트 현황
    essData: 'essData',
    pvData: 'pvData',
    buildData: 'buildData',
    evConnectionStatus: 'evConnectionStatus',

    // PV 현황
    prodPower: 'prodPower',

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

export const STALE_TIME = {
    ONE_MINUTE: 1000 * 60 * 1,
}

/** 사용 예
    queryKey: [QUERY_KEYS.priceByDay]
*/