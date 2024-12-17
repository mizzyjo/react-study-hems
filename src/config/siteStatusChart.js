// 사이트 현황 - 통합 Chart Config
export const initialIntegratedChartConfig = {
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                type: 'bar',
                label: 'ESS충전',
                data: Array(24).fill(0), // 기본값으로 0으로 채운 배열 세팅
                backgroundColor: '#C73C3D',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'bar',
                label: 'ESS방전',
                data: Array(24).fill(0),
                backgroundColor: '#4C5AD6',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'bar',
                label: '건물',
                data: Array(24).fill(0),
                backgroundColor: '#FFAF36',
                borderWidth: 1,
                order: 2,
            },
            {
                type: 'line',
                label: 'PV발전량',
                data: Array(24).fill(0),
                backgroundColor: '#535CD9',
                borderColor: '#535CD9',
                borderWidth: 5,
                order: 1,
            },
        ],
    },
    options: {
        // plugins: {
        //     title: {
        //         display: true,
        //         text: 'Chart.js Bar Chart - Stacked',
        //     },
        // },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            // y: {
            //     stacked: true,
            // },
        },
    },
}

// 시간대별 EV 충전기 연결 현황 Chart Config
export const initialEvConnectionChartConfig = {
    type: 'boxplot',
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                label: '시간',
                data: [],
                backgroundColor: '#4C5CD2',
                borderColor: '#4C5CD2',
                borderWidth:3,
                order: 2,
                yAxisID: 'y-left', // 첫 번째 데이터셋은 왼쪽 y축을 사용
            },
            {
                type: 'line',
                label: 'EV 차량',
                data: Array(24).fill(0),
                backgroundColor: '#08A2CA',
                borderColor: '#08A2CA',
                borderWidth: 3,
                order: 1,
                yAxisID: 'y-right', // 두 번째 데이터셋은 오른쪽 y축을 사용
            },
        ],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Box',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const data = context.raw
                        if ( context.dataset.label === '시간') {
                            return ` 최소: ${data.min}분 / 평균: ${data.median}분 / 최대: ${data.max}분`
                        } else {
                            return ` EV 차량: ${data}`
                        }
                    },
                },
                
            },
        },
        responsive: true,
        scales: {
             // x축 타이틀 설정
             x: {
                title: {
                    display: true,
                    text: '시간',
                    // align: 'start', // 타이틀 왼쪽 정렬
                },
            },
            // y축을 오른쪽에 세팅
            'y-right': {
                // stacked: true,
                position: 'right',
            },
        },
    },
}