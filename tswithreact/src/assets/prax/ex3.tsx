import React, { useState, useEffect, useId } from "react";

// 1. Custom Hook for Fetching Currency Rates
function useCurrencyInfo(currency: string): Record<string, number> {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res[currency.toLowerCase()] || {}))
      .catch((err) => console.error("Error fetching rates:", err));
  }, [currency]);

  return data;
}

// Interface for InputBox Props
interface InputBoxProps {
  label: string;
  amount: number;
  onAmountChange?: (amount: number) => void;
  onCurrencyChange?: (currency: string) => void;
  currencyOptions?: string[];
  selectCurrency?: string;
  amountDisable?: boolean;
  currencyDisable?: boolean;
}

// 2. Reusable InputBox Component
function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
}: InputBoxProps): React.JSX.Element {
  const amountInputId = useId();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "12px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        border: "1px solid #e2e8f0",
      }}
    >
      <div style={{ width: "55%" }}>
        <label
          htmlFor={amountInputId}
          style={{ display: "block", color: "#64748b", fontSize: "12px", marginBottom: "4px" }}
        >
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount === 0 ? "" : amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "transparent",
            color: "#1e293b",
          }}
        />
      </div>

      <div style={{ width: "40%", textAlign: "right" }}>
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "4px" }}>Currency Type</p>
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e1",
            cursor: "pointer",
            outline: "none",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          {currencyOptions.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function Ex3(): React.JSX.Element {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
        fontFamily: "sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#1e293b",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ color: "#ffffff", textAlign: "center", marginBottom: "20px" }}>
          Currency Converter
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(curr) => setFrom(curr)}
            selectCurrency={from}
            onAmountChange={(val) => setAmount(val)}
          />

          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <button
              type="button"
              onClick={swap}
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ⇅ SWAP
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(curr) => setTo(curr)}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}