import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();       
  const [contractABI, setContractABI] = useState("[\n    {\n      \"inputs\": [],\n      \"stateMutability\": \"nonpayable\",\n      \"type\": \"constructor\"\n    },\n    {\n      \"anonymous\": false,\n      \"inputs\": [\n        {\n          \"indexed\": true,\n          \"internalType\": \"uint256\",\n          \"name\": \"itemId\",\n          \"type\": \"uint256\"\n        },\n        {\n          \"indexed\": true,\n          \"internalType\": \"address\",\n          \"name\": \"nftContract\",\n          \"type\": \"address\"\n        },\n        {\n          \"indexed\": true,\n          \"internalType\": \"uint256\",\n          \"name\": \"tokenId\",\n          \"type\": \"uint256\"\n        },\n        {\n          \"indexed\": false,\n          \"internalType\": \"address\",\n          \"name\": \"seller\",\n          \"type\": \"address\"\n        },\n        {\n          \"indexed\": false,\n          \"internalType\": \"address\",\n          \"name\": \"owner\",\n          \"type\": \"address\"\n        },\n        {\n          \"indexed\": false,\n          \"internalType\": \"uint256\",\n          \"name\": \"price\",\n          \"type\": \"uint256\"\n        },\n        {\n          \"indexed\": false,\n          \"internalType\": \"bool\",\n          \"name\": \"sold\",\n          \"type\": \"bool\"\n        }\n      ],\n      \"name\": \"MarketItemCreated\",\n      \"type\": \"event\"\n    },\n    {\n      \"anonymous\": false,\n      \"inputs\": [\n        {\n          \"indexed\": true,\n          \"internalType\": \"uint256\",\n          \"name\": \"itemId\",\n          \"type\": \"uint256\"\n        },\n        {\n          \"indexed\": false,\n          \"internalType\": \"address\",\n          \"name\": \"owner\",\n          \"type\": \"address\"\n        }\n      ],\n      \"name\": \"MarketItemSold\",\n      \"type\": \"event\"\n    },\n    {\n      \"inputs\": [\n        {\n          \"internalType\": \"address\",\n          \"name\": \"nftContract\",\n          \"type\": \"address\"\n        },\n        {\n          \"internalType\": \"uint256\",\n          \"name\": \"tokenId\",\n          \"type\": \"uint256\"\n        },\n        {\n          \"internalType\": \"uint256\",\n          \"name\": \"price\",\n          \"type\": \"uint256\"\n        }\n      ],\n      \"name\": \"createMarketItem\",\n      \"outputs\": [],\n      \"stateMutability\": \"payable\",\n      \"type\": \"function\"\n    },\n    {\n      \"inputs\": [\n        {\n          \"internalType\": \"address\",\n          \"name\": \"nftContract\",\n          \"type\": \"address\"\n        },\n        {\n          \"internalType\": \"uint256\",\n          \"name\": \"itemId\",\n          \"type\": \"uint256\"\n        }\n      ],\n      \"name\": \"createMarketSale\",\n      \"outputs\": [],\n      \"stateMutability\": \"payable\",\n      \"type\": \"function\"\n    },\n    {\n      \"inputs\": [],\n      \"name\": \"fetchMarketItems\",\n      \"outputs\": [\n        {\n          \"components\": [\n            {\n              \"internalType\": \"uint256\",\n              \"name\": \"itemId\",\n              \"type\": \"uint256\"\n            },\n            {\n              \"internalType\": \"address\",\n              \"name\": \"nftContract\",\n              \"type\": \"address\"\n            },\n            {\n              \"internalType\": \"uint256\",\n              \"name\": \"tokenId\",\n              \"type\": \"uint256\"\n            },\n            {\n              \"internalType\": \"address payable\",\n              \"name\": \"seller\",\n              \"type\": \"address\"\n            },\n            {\n              \"internalType\": \"address payable\",\n              \"name\": \"owner\",\n              \"type\": \"address\"\n            },\n            {\n              \"internalType\": \"uint256\",\n              \"name\": \"price\",\n              \"type\": \"uint256\"\n            },\n            {\n              \"internalType\": \"bool\",\n              \"name\": \"sold\",\n              \"type\": \"bool\"\n            }\n          ],\n          \"internalType\": \"struct marketPlaceBoilerPlate.MarketItem[]\",\n          \"name\": \"\",\n          \"type\": \"tuple[]\"\n        }\n      ],\n      \"stateMutability\": \"view\",\n      \"type\": \"function\"\n    },\n    {\n      \"inputs\": [],\n      \"name\": \"owner\",\n      \"outputs\": [\n        {\n          \"internalType\": \"address\",\n          \"name\": \"\",\n          \"type\": \"address\"\n        }\n      ],\n      \"stateMutability\": \"view\",\n      \"type\": \"function\"\n    }\n  ]"); //Smart Contract ABI here
  const [marketAddress, setMarketAddress] = useState("0xa3dDf4B68CCda6c9CB35AE1962c60aA5cb226E90"); //Smart Contract Address Here


  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get("ethAddress")),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider value={{ walletAddress, chainId, marketAddress, setMarketAddress, contractABI, setContractABI }}>
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
