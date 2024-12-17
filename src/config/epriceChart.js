export const initialChartConfigByYear = {
    data: {
        labels: Array.from({ length: 12 }, (_, i) => `${String(i + 1)}월`),
        datasets: [
            {
                type: 'line',
                label: '경부하',
                data: Array(24).fill(0), // 기본값으로 0으로 채운 배열 세팅
                backgroundColor: '#A7C7E7',
                borderColor: '#A7C7E7',
                borderWidth: 3,
            },
            {
                type: 'line',
                label: '중부하',
                data: Array(24).fill(0),
                backgroundColor: '#A2D5AB',
                borderColor: '#A2D5AB',
                borderWidth: 3,
            },
            {
                type: 'line',
                label: '최대부하',
                data: Array(24).fill(0),
                backgroundColor: '#D8B4E2',
                borderColor: '#D8B4E2',
                borderWidth: 3,
            },
        ],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: context => {
                        const data = context.raw
                        return `전기 요금: ${data} 원/kWh`
                    },
                },
            },
        },
    },
}

export const initialChartConfigByDay = {
    data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [
            {
                type: 'line',
                label: '전기요금',
                data: [1, 1, 2, 3, 1, 4, 5],
                backgroundColor: '#F9D5A7',
                borderColor: '#F9D5A7',
                borderWidth: 3,
                stepped: true,
            },
        ],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const data = context.raw
                        return `전기 요금: ${data} 원/kWh`
                    },
                },
            },
        },
    },
}
