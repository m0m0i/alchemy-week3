import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

async function getTransactions(blockNumber) {
  return await alchemy.core
    .getBlockWithTransactions(blockNumber)
    .then((result) => result.transactions);
}

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  const handleGetTransactions = async () => {
    setTransactions(await getTransactions(blockNumber));
  };

  return (
    <>
      <div className="App">Block Number: {blockNumber}</div>
      <button onClick={handleGetTransactions}>
        get the transactions of this block?
      </button>
      {transactions.length > 0
        ? transactions.map((transaction, idx) => (
            <div key={idx}>{transaction.hash}</div>
          ))
        : null}
    </>
  );
}

export default App;
