import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Logo/Icon with bounce animation */}
      <div
        style={{
          fontSize: "64px",
          marginBottom: "24px",
          animation: "splash-bounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
          "@keyframes splash-bounce": {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
            "100%": { transform: "translateY(0)" },
          },
        }}
      >
        <style>{`
          @keyframes splash-bounce {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
          @keyframes splash-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes splash-scale-up {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
        ◼
      </div>

      {/* Main Text with fade and scale animation */}
      <h1
        style={{
          fontSize: "clamp(24px, 5vw, 36px)",
          fontWeight: "600",
          color: "#000",
          marginBottom: "12px",
          lineHeight: "1.2",
          textAlign: "center",
          animation: "splash-fade-in 0.8s ease-out 0.2s both",
          letterSpacing: "-0.5px",
        }}
      >
        QR Code Tools
      </h1>

      {/* Subtitle with delay */}
      <p
        style={{
          fontSize: "clamp(12px, 2vw, 14px)",
          color: "#666",
          textAlign: "center",
          animation: "splash-fade-in 0.8s ease-out 0.4s both",
          maxWidth: "80%",
        }}
      >
        Generate & Decode
      </p>

      {/* Loading bar animation */}
      <div
        style={{
          marginTop: "40px",
          width: "120px",
          height: "3px",
          backgroundColor: "#e0e0e0",
          borderRadius: "2px",
          overflow: "hidden",
          animation: "splash-fade-in 0.8s ease-out 0.6s both",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#000",
            width: "100%",
            animation: "splash-loading 2s ease-in-out forwards",
          }}
        >
          <style>{`
            @keyframes splash-loading {
              0% { width: 0; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
