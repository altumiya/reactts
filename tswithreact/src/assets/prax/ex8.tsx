import React, { useState } from "react";

export default function Ex8(): React.JSX.Element {
  // console.log("App rendered:", Math.random().toFixed(4));

  const [count, setCount] = useState<number>(1);

  // Derived state: computed on every render automatically
  const multipliedValue: number = count * 5;

  const increment = (): void => {
    setCount((prev) => prev + 1);
  };

  const resetToZero = (): void => {
    // If count is already 0, React sees 0 === 0 and skips re-rendering!
    setCount(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        gap: "16px",
      }}
    >
      <h1 style={{ margin: 0 }}>Current Count: {count}</h1>
      <h2 style={{ margin: 0, color: "#38bdf8" }}>
        Multiplied (x5): {multipliedValue}
      </h2>

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button
          onClick={increment}
          style={{
            padding: "10px 18px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Increment (+1)
        </button>

        <button
          onClick={resetToZero}
          style={{
            padding: "10px 18px",
            backgroundColor: "#475569",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Reset to 0 (Check Console)
        </button>
      </div>
    </div>
  );
}