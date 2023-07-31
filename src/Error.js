import React from "react";

export function Error({ error }) {
  return (
    <p
      style={{
        fontSize: "1.6rem",
        textAlign: "center",
      }}
    >
      {error} <span>🔥🔥</span>
    </p>
  );
}
