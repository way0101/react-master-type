const BASE_URL = `https://api.coinpaprika.com/v1`
const CHART_URL = `https://ohlcv-api.nomadcoders.workers.dev`

export async function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then((reponse) => reponse.json())
}

export async function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then((reponse) => reponse.json())
}

export async function fetchCoinTickersInfo(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((reponse) => reponse.json())
}

export async function fetchCoinHistory(coinId:string){
    return fetch(`${CHART_URL}/?coinId=${coinId}`).then((response) => response.json());
}