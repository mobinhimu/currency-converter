import React from "react";
import icon from "./exchange-svgrepo-com.svg";

export function ExchangeLogo({ onCurrency }) {
  return (
    <img
      onClick={onCurrency}
      src={icon}
      className="icon"
      alt="Exchange SVG Logo"
    />
  );
}
