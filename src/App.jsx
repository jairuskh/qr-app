import { useState } from "react";
import QRImageDecoder from "./QRImageDecoder";
import QRGenerator from "./QRGenerator";
import SplashScreen from "./SplashScreen";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultAnimation, setResultAnimation] = useState(false);

  const handleScan = (data) => {
    setResult(data);
    setShowResult(true);
    setResultAnimation(true);
  };

  const resetDecoder = () => {
    setShowResult(false);
    setResult("");
    setResultAnimation(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px", paddingTop: "8px" }}>
        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: "600",
            color: "#000",
            marginBottom: "8px",
            letterSpacing: "-0.5px",
          }}
        >
          QR Code Tools
        </h1>
        <p
          style={{
            fontSize: "clamp(13px, 2vw, 15px)",
            color: "#666",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.5",
          }}
        >
          Generate QR codes and decode screenshots
        </p>
      </div>

      {/* Main container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {/* Left: QR Generator */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
            padding: "28px 24px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <QRGenerator />
        </div>

        {/* Right: Decoder */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
            padding: "28px 24px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <h2
            style={{
              fontSize: "clamp(16px, 3vw, 18px)",
              fontWeight: "600",
              color: "#000",
              marginBottom: "20px",
            }}
          >
            Decode QR Code
          </h2>

          {!showResult ? (
            <QRImageDecoder onDecode={handleScan} />
          ) : result ? (
            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "24px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
              }}
              className={resultAnimation ? "animation-scale-in" : ""}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "12px",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#000",
                }}
              >
                QR Code Decoded
              </h3>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "14px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  marginBottom: "20px",
                  wordBreak: "break-all",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "#333",
                  fontFamily: "monospace",
                }}
              >
                {result}
              </div>

              <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                {result.startsWith("http") && (
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "11px 16px",
                      backgroundColor: "#f0f0f0",
                      color: "#000",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      border: "1px solid #ddd",
                      transition: "all 0.2s ease",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#000";
                      e.target.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#f0f0f0";
                      e.target.style.color = "#000";
                    }}
                  >
                    🔗 Open Link
                  </a>
                )}

                <button
                  onClick={resetDecoder}
                  style={{
                    padding: "11px 16px",
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f5f5f5";
                    e.target.style.borderColor = "#999";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.borderColor = "#ddd";
                  }}
                >
                  ↻ Scan Another
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;