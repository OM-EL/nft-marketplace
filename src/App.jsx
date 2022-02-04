import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout} from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import ERC20Balance from "components/ERC20Balance";
import Ramper from "components/Ramper";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
import React from 'react';
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();



  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <SearchCollections setInputValue={setInputValue}/>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
              width: "100%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >

            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </Menu.Item>

            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🎨 Your Collection</NavLink>
            </Menu.Item>

            <Menu.Item key="transactions">
              <NavLink to="/Transactions">📑 Your Transactions</NavLink>
            </Menu.Item>

            <Menu.Item key="onramp">
              <NavLink to="/onramp">💰 Buy Crypto</NavLink>
            </Menu.Item>

           
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          <a>
            COPYRIGHT © 2022 GALERIE VIECELI TOUS DROITS RÉSERVÉS.
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    

    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="40pt" height="262.000000pt" viewBox="0 0 194.000000 262.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,262.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1225 2530 c-32 -13 -62 -51 -89 -112 -21 -47 -35 -63 -81 -92 -30
-20 -56 -44 -57 -53 -1 -10 -2 -40 -2 -66 -1 -47 -2 -49 -39 -62 -49 -17 -66
-40 -67 -90 l0 -40 -215 -129 -215 -129 -18 23 c-27 34 -121 33 -181 -1 -43
-24 -43 -24 -36 -69 19 -127 22 -111 -36 -150 -32 -21 -69 -57 -91 -90 -20
-30 -46 -64 -58 -75 -23 -24 -26 -48 -7 -67 7 -7 25 -98 40 -203 61 -418 162
-1028 173 -1047 6 -9 127 -35 205 -43 112 -12 307 21 454 76 48 18 55 24 55
48 0 15 -16 116 -35 224 -45 252 -155 975 -159 1045 -4 62 -18 82 -58 82 -18
0 -50 15 -83 39 -30 21 -75 44 -100 51 -46 13 -79 46 -53 54 53 16 509 98 515
93 1 -2 9 -21 16 -43 15 -41 45 -64 88 -64 29 0 60 -30 79 -78 25 -65 80 -79
182 -47 l55 18 59 -37 c91 -56 126 -48 198 45 38 49 52 60 85 65 23 4 49 17
63 31 21 22 23 33 21 108 l-2 84 38 40 c60 63 63 121 10 196 -27 36 -29 44
-23 100 10 93 -19 138 -110 172 -42 15 -51 24 -63 58 -18 51 -68 103 -113 115
-26 8 -53 6 -106 -6 l-71 -17 -45 27 c-45 26 -86 32 -123 16z m111 -36 c36
-21 52 -25 87 -20 146 21 151 20 190 -14 23 -19 41 -47 47 -71 11 -42 33 -60
92 -79 21 -6 49 -25 63 -42 23 -27 25 -37 23 -106 -3 -70 0 -81 25 -117 43
-63 35 -121 -25 -177 -28 -26 -28 -30 -26 -112 3 -98 -9 -120 -72 -131 -38 -6
-71 -34 -105 -88 -19 -30 -63 -57 -92 -57 -10 0 -42 16 -70 35 -58 39 -77 42
-131 19 -80 -33 -144 -14 -157 46 -10 43 -50 78 -101 86 -42 6 -45 9 -61 56
l-18 50 -50 -7 c-27 -3 -135 -22 -240 -41 -288 -54 -257 -52 -253 -18 3 25 26
42 221 160 119 72 220 134 224 138 4 3 6 24 5 44 -3 42 14 64 58 77 45 13 51
24 48 88 -3 65 -4 62 72 110 23 15 45 42 65 83 35 71 51 93 80 104 34 14 55
11 101 -16z m-920 -726 c4 -7 -2 -18 -14 -26 -35 -23 -29 -68 11 -92 l32 -20
-50 0 c-28 0 -66 -4 -84 -10 -19 -5 -36 -8 -39 -6 -2 3 -8 24 -13 48 -5 24
-12 51 -15 61 -11 36 151 79 172 45z m24 -74 c0 -27 -12 -31 -30 -9 -10 12
-10 18 0 30 16 19 30 10 30 -21z m41 -108 c56 -13 149 -60 149 -74 0 -4 -55
-16 -122 -26 -67 -9 -176 -28 -243 -42 -129 -26 -165 -29 -165 -15 0 15 80
100 117 122 75 47 166 59 264 35z m256 -112 c4 -10 0 -22 -10 -29 -16 -12
-383 -75 -565 -97 -82 -10 -104 -9 -115 1 -10 10 -8 15 7 27 11 8 30 14 41 14
12 0 82 11 156 25 159 30 425 73 457 74 12 1 25 -6 29 -15z m7 -95 c7 -35 8
-79 2 -79 -2 0 -20 7 -39 15 -69 29 -134 10 -157 -45 -11 -26 -10 -41 5 -95
28 -104 13 -122 -116 -134 -89 -10 -122 -27 -146 -76 -15 -31 -15 -37 0 -77
10 -24 44 -74 77 -112 68 -76 100 -132 100 -173 0 -15 -16 -53 -35 -83 -46
-71 -47 -119 -6 -161 20 -20 39 -29 61 -29 32 0 57 21 131 109 27 32 57 41 63
19 2 -7 8 -40 14 -73 19 -101 91 -142 174 -99 17 9 34 12 38 7 3 -4 12 -37 18
-73 14 -76 18 -71 -93 -105 -188 -57 -381 -69 -520 -32 l-50 13 -48 280 c-48
283 -146 934 -141 934 10 0 492 73 559 84 44 8 85 14 91 15 6 1 14 -13 18 -30z
m-19 -102 l40 -23 26 -174 c15 -96 45 -290 67 -430 56 -350 56 -311 -1 -339
-46 -23 -50 -23 -82 -8 -37 18 -55 60 -55 129 0 29 -6 41 -25 54 -37 24 -76 4
-121 -62 -38 -56 -65 -71 -107 -60 -29 7 -49 49 -40 84 3 15 21 49 40 76 18
26 33 60 33 75 0 42 -43 121 -96 181 -79 87 -94 111 -94 145 0 58 64 93 173
95 90 1 129 57 102 146 -8 27 -15 61 -15 76 0 57 83 76 155 35z"/>
<path d="M1514 2449 c-43 -15 -37 -48 19 -104 29 -28 62 -64 74 -79 13 -15 29
-26 35 -24 22 7 20 64 -2 116 -33 76 -79 109 -126 91z m58 -29 c14 -11 35 -40
47 -65 34 -72 24 -117 -12 -56 -9 16 -35 44 -57 61 -40 31 -52 64 -27 73 20 9
23 8 49 -13z"/>
<path d="M1637 2214 c-13 -13 -7 -51 9 -65 23 -19 49 1 49 37 0 24 -5 30 -25
32 -14 2 -29 0 -33 -4z m43 -29 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7
15 15 15 8 0 15 -7 15 -15z"/>
<path d="M1735 1900 c-8 -16 -15 -49 -15 -73 0 -37 -5 -48 -36 -78 -20 -18
-45 -52 -55 -75 -28 -61 -51 -78 -99 -71 -45 6 -54 -8 -14 -24 50 -18 92 8
129 81 13 25 39 61 59 79 32 31 36 40 36 86 0 30 6 59 15 71 17 22 19 34 5 34
-5 0 -16 -13 -25 -30z"/>
<path d="M359 261 c-44 -44 -50 -80 -19 -111 11 -11 31 -20 44 -20 31 0 66 43
66 82 0 34 -26 88 -41 88 -6 0 -29 -17 -50 -39z m61 -35 c0 -47 -17 -70 -47
-64 -29 5 -29 53 1 83 36 36 46 31 46 -19z"/>
<path d="M619 1248 c-14 -25 -5 -134 12 -154 6 -8 18 -14 26 -14 11 0 14 15
13 63 0 34 3 77 6 95 6 29 4 32 -20 32 -16 0 -30 -8 -37 -22z m37 -14 c-3 -9
-6 -39 -7 -67 -1 -41 -3 -47 -9 -27 -10 32 -12 95 -3 103 12 13 25 7 19 -9z"/>
<path d="M430 824 c0 -3 14 -24 31 -45 35 -44 69 -126 69 -164 0 -14 5 -25 11
-25 16 0 4 80 -19 133 -28 62 -92 132 -92 101z"/>
</g>
</svg>

  </div>
);

export default App;
