export const initialChartConfig = {
    labels: Array.from({ length: 24 }, (_, i) => String(i)),
    datasets: [
        {
            type: 'bar',
            label: '전일 소비 전력량',
            backgroundColor: '#868786',
            brderWidth: 1,
            data: [],
            tension: 0.1
        },
        {
            type: 'bar',
            label: '기준일 소비 전력량',
            backgroundColor: '#ee7369',
            brderWidth: 1,
            data: [],
            tension: 0.1
        },
    ]
}