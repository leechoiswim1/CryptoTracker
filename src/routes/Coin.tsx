import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const InfoList = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const Info = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  span {
    margin-top: 10px;
    display: block;
    font-size: 18px;
  }
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const Coin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InfoList>
            <Info>
              RANK :<span>{priceInfo?.rank}</span>
            </Info>
            <Info>
              SYMBOL :<span>${priceInfo?.symbol}</span>
            </Info>
            <Info>
              OPEN SOURCE :<span>{info?.open_source ? "Yes" : "No"}</span>
            </Info>
          </InfoList>
          <Desc>{info?.description}</Desc>
          <InfoList>
            <Info>
              TOTAL SUPLY :<span>{priceInfo?.total_supply}</span>
            </Info>

            <Info>
              MAX SUPLY :<span>{priceInfo?.max_supply}</span>
            </Info>
          </InfoList>
        </>
      )}
    </Container>
  );
};

export default Coin;
