import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps{
    coinId: string;
}

interface IHistorical{
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({coinId}: ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    const series = data ? [{
        data: data.map(price => ({
            x: price.time_close,
            y: [price.open, price.high, price.low, price.close]
        }))
    }] : [];
    return(
        <div>
            {isLoading ? "Loading chart..." : <ApexCharts 
            type="candlestick" 
            options={{
                theme: {
                    mode: "dark"
                },
                chart:{
                    type: 'candlestick',
                    height: 500,
                    width: 500
                },
                stroke:{
                    width: 2,
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    type: 'datetime',
                    categories: data?.map((price) => price.time_close)
                },
                yaxis: {
                    show: false,
                },
                colors: ["red"],
                tooltip: {
                    y:{
                        formatter: (value) => `$ ${value.toFixed(1)}`,
                    }
                }
            }}
            series={series}/>}
        </div>
    )
}

export default Chart;