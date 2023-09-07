import { useEffect, useState } from "react";
import { API } from "../api/Api";

function Currency() {
  const [currency, setCurrency] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const getData = async () => {
    const response = await fetch(API);
    const data = await response.json();
    setCurrency(data);
    setIsPending(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const buyRate = (value) => {
    return (value * 105) / 100;
  };

  const sellRate = (value) => {
    return (value * 95) / 100;
  };

  return (
    <>
      {isPending && (
        <div className="flex flex-col justify-center items-center h-screen bg-orange-500 text-white font-Inter text-xl font-bold">
          Loading...
        </div>
      )}
      {!isPending && (
        <div className="flex flex-col justify-center items-center h-screen bg-orange-500 text-white font-Inter">
          <div>
            <table className="border-separate text-xl">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>We Buy</th>
                  <th>Exchange Rate</th>
                  <th>We Sell</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(currency.rates).map((key) => {
                  return (
                    <>
                      <tr key={key} className="text-lg">
                        <td>{key}</td>
                        <td>{buyRate(currency.rates[key]).toFixed(4)}</td>
                        <td>{Number(currency.rates[key]).toFixed(2)}</td>
                        <td>{sellRate(currency.rates[key]).toFixed(4)}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <div className="font-bold">Date : {currency.date}</div>
            <div>Rates are based from 1 {currency.base}</div>
            <div>
              This application uses API from{" "}
              <a
                href="http://currencyfreaks.com"
                className="font-bold"
                target="_blank"
                rel="noreferrer"
              >
                http://currencyfreaks.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Currency;
