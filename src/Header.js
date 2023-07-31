import React from "react";

function Header({ amount, onAmount }, ref) {
  return (
    <>
      <h3 className="header">Currency Converter</h3>
      <label>Enter Amount</label>
      <input
        ref={ref}
        className="input"
        value={amount}
        onChange={(eve) => onAmount(eve)}
      />
    </>
  );
}

export default React.forwardRef(Header);
