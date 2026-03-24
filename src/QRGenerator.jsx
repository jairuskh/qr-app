import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("https://example.com");
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    generateQR(text);
  }, [text]);

  const generateQR = async (value) => {
    try {
      const url = await QRCode.toDataURL(value, {
        errorCorrectionLevel: "H",
        type: "image/png",
        quality: 0.95,
        margin: 1,
        width: 300,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrImage(url);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  return (
    <div>
      <h2 style={{
        fontSize: "clamp(16px, 3vw, 18px)",
        fontWeight: "600",
        color: "#000",
        marginBottom: "20px",
      }}>
        Generate QR Code
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="qr-input" style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "500",
          color: "#666",
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}>
          Text or URL
        </label>
        <input
          id="qr-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
        />
      </div>

      {qrImage && (
        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
          textAlign: "center",
        }}>
          <img
            src={qrImage}
            alt="Generated QR Code"
            style={{
              maxWidth: "100%",
              border: "2px solid #000",
              borderRadius: "8px",
              padding: "12px",
              backgroundColor: "#fff",
              marginBottom: "12px",
            }}
          />
          <p style={{
            fontSize: "12px",
            color: "#000",
            marginBottom: "4px",
            wordBreak: "break-all",
            fontWeight: "500",
          }}>
            {text}
          </p>
          <p style={{
            fontSize: "11px",
            color: "#999",
          }}>
            Right-click to save or take a screenshot
          </p>
        </div>
      )}
    </div>
  );
}
