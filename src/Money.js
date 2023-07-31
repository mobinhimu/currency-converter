import React from "react";

export function Money({ amount, convertedAmount }) {
  const {
    base_code: baseCode,
    // conversion_rate: conversionRate,
    conversion_result: conversionResult,
    target_code: targetCode,
  } = convertedAmount;
  return (
    <p className="money">{`${amount ? amount : 0} ${baseCode} = ${
      conversionResult ? conversionResult : 0
    } ${targetCode}`}</p>
  );
}
