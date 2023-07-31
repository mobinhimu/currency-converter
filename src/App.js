import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { Options } from "./Options";
import { ExchangeLogo } from "./ExchangeLogo";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { Button } from "./Button";
import { Money } from "./Money";
import { FromTo } from "./FromTo";
import Header from "./Header";
import { OptionsHeader } from "./OptionsHeader";
import { Option } from "./Option";

function App() {
  const [amount, setAmount] = useState("");
  const [convert, setConvert] = useState(false);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BDT");
  const input = useRef(null);

  function handleAmount(eve) {
    setAmount(+eve.target.value);
  }

  function handleConvert() {
    setConvert(true);
  }

  function changeCurrency() {
    setFrom(to);
    setTo(from);
  }

  // For Getting Currency
  const { loading, error, data } = useFetch(
    "https://openexchangerates.org/api/currencies.json"
  );
  const currency = data ? Object.entries(data) : [];

  const URL = `https://v6.exchangerate-api.com/v6/0d0d6f283e21687351022621/pair/${from}/${to}/${amount}`;
  const { loading: currencyLoading, data: convertedAmount } = useFetch(URL);

  // event handling
  useEffect(() => {
    document.addEventListener("keydown", (eve) => {
      if (eve.code.toLocaleLowerCase() === "enter") {
        amount ? handleConvert() : input.current.focus();
      }
    });
  }, [amount]);

  return (
    <main className="container converter-box">
      <Header amount={amount} onAmount={handleAmount} ref={input} />
      <FromTo />

      {loading && <Loading />}

      {!error && !loading && (
        <OptionsHeader>
          <Options>
            <select value={from} onChange={(eve) => setFrom(eve.target.value)}>
              {currency?.map((curr) => (
                <Option curr={curr[0]} key={curr[0]} />
              ))}
            </select>
          </Options>
          <ExchangeLogo onCurrency={changeCurrency} />
          <Options>
            <select value={to} onChange={(eve) => setTo(eve.target.value)}>
              {currency?.map((curr) => (
                <Option curr={curr[0]} key={curr[0]} />
              ))}
            </select>
          </Options>
        </OptionsHeader>
      )}
      {error && <Error error={error} />}
      {convert && (
        <Money
          amount={amount}
          from={from}
          to={to}
          convertedAmount={convertedAmount}
        />
      )}
      {convert ? (
        <p className="message">
          Your <strong>CURRENCY</strong> Will Be Updated Automatically
        </p>
      ) : (
        <Button
          amount={amount}
          onConvert={handleConvert}
          currencyLoading={currencyLoading}
        />
      )}
    </main>
  );
}

export default App;
