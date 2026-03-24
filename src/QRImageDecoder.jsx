import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRImageDecoder({ onDecode }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [decoding, setDecoding] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    setError("");
    setDecoding(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(file);

    try {
      const html5QrCode = new Html5Qrcode("qr-image-decoder");
      const decodedText = await html5QrCode.scanFile(file, true);
      onDecode(decodedText);
      setError("");
    } catch (err) {
      setError("No QR code found in this image");
    } finally {
      setDecoding(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div
        style={{
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "36px 20px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          cursor: "pointer",
          transition: "all 0.2s ease",
          userSelect: "none",
        }}
        onClick={triggerFileInput}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.style.backgroundColor = "#f0f0f0";
          e.currentTarget.style.borderColor = "#999";
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f9f9f9";
          e.currentTarget.style.borderColor = "#ccc";
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.backgroundColor = "#f9f9f9";
          const file = e.dataTransfer.files?.[0];
          if (file) {
            fileInputRef.current = { files: { 0: file, length: 1 } };
            const event = { target: { files: { 0: file, length: 1 } } };
            handleImageUpload(event);
          }
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "10px" }}>📤</div>
        <p style={{
          fontSize: "15px",
          fontWeight: "500",
          margin: "8px 0",
          color: "#000",
        }}>
          {decoding ? "Scanning..." : "Upload QR Code Image"}
        </p>
        <p style={{
          fontSize: "12px",
          color: "#666",
          margin: "6px 0",
        }}>
          Click to browse or drag & drop
        </p>
        <p style={{
          fontSize: "11px",
          color: "#999",
          margin: "4px 0",
        }}>
          PNG, JPG, GIF, WebP • Up to 10MB
        </p>
      </div>

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <p style={{
            fontSize: "12px",
            color: "#666",
            marginBottom: "10px",
            fontWeight: "500",
          }}>
            Preview:
          </p>
          <img
            src={preview}
            alt="Uploaded QR code"
            style={{
              maxWidth: "100%",
              maxHeight: "280px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {error && (
        <p style={{
          color: "#d32f2f",
          marginTop: "14px",
          fontSize: "12px",
          backgroundColor: "#ffebee",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #ffcdd2",
        }}>
          ⚠️ {error}
        </p>
      )}

      <div id="qr-image-decoder" style={{ display: "none" }} />
    </div>
  );
}
