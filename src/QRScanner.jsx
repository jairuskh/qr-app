import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner({ onScan, isScanning = true }) {
  const [error, setError] = useState("");
  const scannerRef = useRef(null);
  const cameraStartedRef = useRef(false);

  useEffect(() => {
    if (!isScanning) return;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" }, // use back camera
          { fps: 15, qrbox: { width: 250, height: 250 } }, // increased fps for better scanning
          (decodedText) => {
            onScan(decodedText);
          },
          (errorMessage) => {
            // ignore scan errors silently
          }
        );
        cameraStartedRef.current = true;
        setError("");
      } catch (err) {
        setError(`Camera error: ${err.message}`);
        console.error("Scanner error:", err);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current && cameraStartedRef.current) {
        scannerRef.current.stop().catch(() => {});
        cameraStartedRef.current = false;
      }
    };
  }, [isScanning, onScan]);

  return (
    <div>
      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "350px",
          margin: "auto",
          borderRadius: "8px",
          overflow: "hidden",
          border: "3px solid #007bff",
        }}
      />
      {error && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          ⚠️ {error}
        </p>
      )}
      <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
        Point your camera at a QR code
      </p>
    </div>
  );
}