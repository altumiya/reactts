import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// --- Interfaces & Types ---
interface ThemeContextType {
  themeMode: string;
  toggleTheme: () => void;
}

interface User {
  username: string;
  password?: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

// --- Context Definitions ---
export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  toggleTheme: () => {},
});

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// --- ThemeBtn Component ---
export function ThemeBtn(): React.JSX.Element {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const isDark = themeMode === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "46px",
          height: "24px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDark ? "#2563eb" : "#cbd5e1",
            borderRadius: "24px",
            transition: "0.3s",
          }}
        >
          <span
            style={{
              position: "absolute",
              height: "18px",
              width: "18px",
              left: isDark ? "24px" : "3px",
              bottom: "3px",
              backgroundColor: "white",
              borderRadius: "50%",
              transition: "0.3s",
            }}
          />
        </span>
      </label>
      <span
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color: isDark ? "#f8fafc" : "#1e293b",
        }}
      >
        {isDark ? "Dark" : "Light"}
      </span>
    </div>
  );
}

// --- Login Component ---
export function Login(): React.JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useContext(UserContext);
  const { themeMode } = useContext(ThemeContext);
  const isDark = themeMode === "dark";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }
    setUser({ username, password });
    setPassword("");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: `1px solid ${isDark ? "#475569" : "#cbd5e1"}`,
    backgroundColor: isDark ? "#334155" : "#ffffff",
    color: isDark ? "#ffffff" : "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        padding: "18px",
        borderRadius: "12px",
        border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
        marginBottom: "16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px 0",
          fontSize: "16px",
          color: isDark ? "#f8fafc" : "#0f172a",
        }}
      >
        User Login
      </h3>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
        autoComplete="username"
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
        autoComplete="current-password"
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#ea580c",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        Submit
      </button>
    </form>
  );
}

// --- Profile Component ---
export function Profile(): React.JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const { themeMode } = useContext(ThemeContext);
  const isDark = themeMode === "dark";

  if (!user) {
    return (
      <div
        style={{
          padding: "12px",
          textAlign: "center",
          fontSize: "13px",
          color: isDark ? "#94a3b8" : "#64748b",
          backgroundColor: isDark ? "#1e293b" : "#ffffff",
          border: `1px dashed ${isDark ? "#475569" : "#cbd5e1"}`,
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        Please log in above to view profile details.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderRadius: "8px",
        backgroundColor: isDark ? "#064e3b" : "#dcfce7",
        color: isDark ? "#a7f3d0" : "#14532d",
        border: `1px solid ${isDark ? "#047857" : "#bbf7d0"}`,
        marginBottom: "16px",
      }}
    >
      <span style={{ fontSize: "14px" }}>
        Welcome, <strong>{user.username}</strong>!
      </span>
      <button
        type="button"
        onClick={() => setUser(null)}
        style={{
          backgroundColor: "#ef4444",
          color: "#ffffff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        Logout
      </button>
    </div>
  );
}

// --- Card Component ---
export function Card(): React.JSX.Element {
  const { themeMode } = useContext(ThemeContext);
  const isDark = themeMode === "dark";

  return (
    <div
      style={{
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        color: isDark ? "#f8fafc" : "#0f172a",
        borderRadius: "12px",
        border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <img
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src="https://img.magnific.com/premium-vector/cartoon-style-classic-mens-wrist-watch-vector-illustration_939711-3056.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Apple Watch Series 7"
      />
      <div style={{ padding: "16px" }}>
        <h4 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
          Apple Watch Series 7 GPS
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>$599</span>
          <button
            type="button"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function Ex5(): React.JSX.Element {
  const [themeMode, setThemeMode] = useState<string>("light");
  const [user, setUser] = useState<User | null>(null);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = themeMode === "dark";

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
            color: isDark ? "#f8fafc" : "#0f172a",
            padding: "24px 16px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
            transition: "background-color 0.25s ease, color 0.25s ease",
          }}
        >
          <div style={{ width: "100%", maxWidth: "380px" }}>
            {/* Header / Theme Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
                Context & Theme
              </h2>
              <ThemeBtn />
            </div>

            {/* Login & Profile Cards */}
            <Login />
            <Profile />

            {/* Product Card */}
            <Card />
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}