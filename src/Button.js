import React from "react";

export function Button({ onConvert, amount, currencyLoading }) {
  return (
    <button
      className="button"
      disabled={amount && !currencyLoading ? false : true}
      onClick={onConvert}
    >
      {currencyLoading ? "Loading............" : "Get Exchange Rate"}
    </button>
  );
}
