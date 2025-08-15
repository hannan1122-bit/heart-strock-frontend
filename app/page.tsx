"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import Footer from "../components/Footer";

export default function HomePage() {
  const [result, setResult] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url('https://www.sunwaymedical.com/images/uploads/editor/product/inthenews/20interestingfacts.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontWeight: 600,
          userSelect: "none",
          position: "relative",
          zIndex: 0,
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Info Section */}
        <section
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            marginBottom: "2rem",
            backgroundColor: "rgba(245, 138, 138, 0.7)",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "1.25rem",
            lineHeight: 1.6,
            width: "100%",
            color: "black",
          }}
        >
          <p>
            Heart disease is one of the leading causes of death worldwide. It occurs when the heart’s
            blood vessels are damaged or blocked, leading to serious health complications such as heart attacks.
            Early detection and lifestyle changes can significantly reduce the risk of heart disease.
            Stay informed and take proactive steps to maintain a healthy heart.
          </p>
        </section>

        {/* Form container with bright background */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "rgba(202, 99, 99, 0.95)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            color: "#000",
          }}
        >
          <Form onResult={(prediction) => setResult(prediction)} />
        </div>

        {/* Prediction display */}
        {result !== null && (
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "600px",
              margin: "1rem auto",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#ffd700",
              textAlign: "center",
              width: "100%",
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
            }}
          >
            Prediction: {result === 1 ? "⚠ Stroke Risk Detected" : "✅ No Stroke Risk"}
          </div>
        )}
      </div>

      {/* Footer outside the overlay container */}
      <Footer />
    </>
  );
}
