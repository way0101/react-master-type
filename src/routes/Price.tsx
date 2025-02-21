import { useQuery } from "react-query";
import { fetchCoinTickersInfo, fetchCoinInfo } from "../api";


interface PriceProps{
    coinId: string;
}

interface PriceCoins{

}



function Price({coinId}: PriceProps){
    const {isLoading, data} = useQuery(["coins", coinId], ()=> fetchCoinTickersInfo(coinId))
    // console.log(data.quotes.USD.price)
    console.log(data)
    return(
        <div>
            {isLoading ? "Loading price" : 
            <p>Price: {data?.quotes.USD.price}</p>
            }
        </div>
    )
}

export default Price;