export const initialChartConfig = {
    data: {
        labels: Array.from({ length: 1440 }, (_, i) => String(i)), // 0 ~ 24 시
        datasets: [
            {
                type: 'line',
                label: '발전 출력(kW)',
                data: Array(1440).fill(0),
                backgroundColor: '#A7C7E7',
                borderColor: '#A7C7E7',
                borderWidth: 3,
                pointRadius: 0,
            },
        ],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: context => {
                        const data = context.raw
                        return `발전 출력(kWh): ${data} kW`
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    callback: (value, idx) => {
                        /** x축 라벨을 0 ~ 23으로 표시하기 위함 */
                        if (value === 1439) { // 마지막 값(1439)일 경우 23시로 표시
                            return 23
                        }
                        if (idx === 0) { // 첫 번째 값(0)일 경우 0시로 표시
                            return 0
                        }
                        if (value % 60 === 0) {  // 60분 단위로 표시 (0, 60, 120, ..., 1380)
                            return value / 60
                        }
                        return null // 그 외에는 표시하지 않음 (null 반환)
                        // return value == 1439 ? 23 : idx == 0 ? 0 : value % 60 === 0 ? (value / 60) : null; // 0 ~ 23 표시
                    }, 
                },
                // min: 1, // x축이 1부터 시작
            },
            y: {
                ticks: {
                    beginAtZero: true, // y축이 0부터 시작
                    stepSize: 5, // y축 간격을 5로 설정
                },
                max: function (ctx) {
                    const datasets = ctx.chart.data.datasets
                    let max = 0
                    datasets.forEach(dataset => {
                        max = Math.max(max, ...dataset.data)
                    })
                    return max + 5 // 최대값보다 약간 여유를 추가
                },
                min: function (ctx) {
                    const datasets = ctx.chart.data.datasets
                    let min = 0
                    datasets.forEach(dataset => {
                        min = Math.min(min, ...dataset.data)
                    })
                    return min > 0 ? 0 : min - 5 // 최소값보다 약간 여유를 추가
                },
            },
        },
    },
}
