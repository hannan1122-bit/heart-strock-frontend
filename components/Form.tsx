"use client";

import { useState } from "react";

interface FormData {
  gender: number;
  age: number | "";
  hypertension: number;
  heart_disease: number;
  ever_married: number;
  Residence_type: number;
  avg_glucose_level: number | "";
  bmi: number | "";
  work_type_Never_worked: number;
  work_type_Private: number;
  work_type_Self_employed: number;
  work_type_children: number;
  smoking_status_formerly_smoked: number;
  smoking_status_never_smoked: number;
  smoking_status_smokes: number;
}

export default function Form({ onResult }: { onResult: (result: number) => void }) {
  const [formData, setFormData] = useState<FormData>({
    gender: 0,
    age: "",
    hypertension: 0,
    heart_disease: 0,
    ever_married: 0,
    Residence_type: 0,
    avg_glucose_level: "",
    bmi: "",
    work_type_Never_worked: 0,
    work_type_Private: 0,
    work_type_Self_employed: 0,
    work_type_children: 0,
    smoking_status_formerly_smoked: 0,
    smoking_status_never_smoked: 0,
    smoking_status_smokes: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // <- Loading state

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // start loading

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL || "https://stroke-backend-production-ea26.up.railway.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      onResult(data.prediction);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to connect to prediction server. Is FastAPI running?");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <>
      <style>{`
        .container { max-width: 600px; margin: 2rem auto; padding: 2rem; background:rgb(185, 169, 166); border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        h1 { margin-bottom: 0.2rem; color:rgb(141, 41, 2); text-align: center; font-size: 2.2rem; font-weight: 900; }
        h3 { text-align: center; color: black; margin-bottom: 2rem; font-weight: 400; font-size: 1rem; }
        form { display: flex; flex-direction: column; gap: 1.2rem; }
        label { font-weight: 600; color: #333; margin-bottom: 0.4rem; display: block; }
        select, input[type="number"] { padding: 0.5rem 0.7rem; font-size: 1rem; border: 2px solid #ddd; border-radius: 6px; transition: border-color 0.3s ease; width: 100%; color: black; }
        select:focus, input[type="number"]:focus { outline: none; border-color:rgb(153, 31, 0); box-shadow: 0 0 8px rgba(153, 18, 0, 0.63); }
        button { background-color:rgb(153, 18, 0); color: white; padding: 0.8rem; font-size: 1.1rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background-color 0.3s ease; margin-top: 1rem; }
        button:hover { background-color:rgb(102, 0, 0); }
        .error { margin-top: 1rem; color: #d32f2f; text-align: center; font-weight: 700; }

        /* Loading spinner */
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid rgb(153, 18, 0);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          animation: spin 1s linear infinite;
          margin: 1rem auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="container">
        <h1>Stroke Prediction</h1>
        <h3>Please enter patient details below</h3>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* ... all your input fields remain the same ... */}
          <div>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </select>
          </div>
          {/* Repeat all your other fields here */}

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {/* Show spinner while loading */}
        {loading && <div className="spinner"></div>}
      </div>
    </>
  );
}
