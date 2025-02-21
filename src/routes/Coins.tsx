import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";


const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    color: ${(props)=>props.theme.textColor};
    
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        display: flex;
        padding: 20px;
        transition: color 0.2s ease-in;
        align-items: center;
    }
    &:hover{
        a{
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 40px;
    color: ${(props) => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Transform = styled.button`
    width: 100px;
    height: 30px;
    background-color: ${(props) => props.theme.accentColor};
`

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


function Coins(){
    const {isLoading, data} = useQuery<CoinInterface[]>(["allCoins"], fetchCoins)
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true)
    // useEffect(()=>{
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins")
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false)
    //     })()
    // }, [])
    
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (<Loader>Loading....</Loader>) : (<CoinsList>
                {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                    <Link to={{
                        pathname: `/${coin.id}`,
                        state: {name: coin.name},
                    }}>
                        <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} alt="" />{coin.name} &rarr;

                    </Link>
                </Coin>)}
            </CoinsList>)}
        </Container>
    )
}

export default Coins;