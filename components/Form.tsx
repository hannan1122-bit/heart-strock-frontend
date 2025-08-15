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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL || "https://stroke-backend-production-ea26.up.railway.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      onResult(data.prediction);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to connect to prediction server. Please try again later.");
    } finally {
      setIsLoading(false);
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
        button:disabled { background-color: #cccccc; cursor: not-allowed; }
        .error { margin-top: 1rem; color: #d32f2f; text-align: center; font-weight: 700; }
        .loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 1rem 0; }
        .loading-spinner { width: 50px; height: 50px; border: 5px solid rgba(255, 255, 255, 0.3); border-radius: 50%; border-top-color: rgb(153, 18, 0); animation: spin 1s ease-in-out infinite; }
        .loading-text { margin-top: 1rem; color: rgb(141, 41, 2); font-weight: 600; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="container">
        <h1>Stroke Prediction</h1>
        <h3>Please enter patient details below</h3>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Gender */}
          <div>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required disabled={isLoading}>
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label>Age:</label>
            <input name="age" type="number" step="0.1" value={formData.age} onChange={handleChange} required min="0" max="120" placeholder="Enter age" disabled={isLoading} />
          </div>

          {/* Hypertension */}
          <div>
            <label>Hypertension:</label>
            <select name="hypertension" value={formData.hypertension} onChange={handleChange} required disabled={isLoading}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          {/* Heart Disease */}
          <div>
            <label>Heart Disease:</label>
            <select name="heart_disease" value={formData.heart_disease} onChange={handleChange} required disabled={isLoading}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          {/* Ever Married */}
          <div>
            <label>Ever Married:</label>
            <select name="ever_married" value={formData.ever_married} onChange={handleChange} required disabled={isLoading}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          {/* Residence Type */}
          <div>
            <label>Residence Type:</label>
            <select name="Residence_type" value={formData.Residence_type} onChange={handleChange} required disabled={isLoading}>
              <option value={0}>Rural</option>
              <option value={1}>Urban</option>
            </select>
          </div>

          {/* Avg Glucose */}
          <div>
            <label>Average Glucose Level:</label>
            <input name="avg_glucose_level" type="number" step="0.1" value={formData.avg_glucose_level} onChange={handleChange} required placeholder="e.g. 85.6" min="0" disabled={isLoading} />
          </div>

          {/* BMI */}
          <div>
            <label>BMI:</label>
            <input name="bmi" type="number" step="0.1" value={formData.bmi} onChange={handleChange} required placeholder="e.g. 25.4" min="0" disabled={isLoading} />
          </div>

          {/* Work Type */}
          <div>
            <label>Work Type:</label>
            <select
              required
              onChange={(e) => {
                const choice = Number(e.target.value);
                setFormData({
                  ...formData,
                  work_type_Never_worked: choice === 1 ? 1 : 0,
                  work_type_Private: choice === 2 ? 1 : 0,
                  work_type_Self_employed: choice === 3 ? 1 : 0,
                  work_type_children: choice === 4 ? 1 : 0,
                });
              }}
              disabled={isLoading}
            >
              <option value="">-- Select Work Type --</option>
              <option value={1}>Never Worked</option>
              <option value={2}>Private</option>
              <option value={3}>Self Employed</option>
              <option value={4}>Children</option>
            </select>
          </div>

          {/* Smoking Status */}
          <div>
            <label>Smoking Status:</label>
            <select
              required
              onChange={(e) => {
                const choice = Number(e.target.value);
                setFormData({
                  ...formData,
                  smoking_status_formerly_smoked: choice === 1 ? 1 : 0,
                  smoking_status_never_smoked: choice === 2 ? 1 : 0,
                  smoking_status_smokes: choice === 3 ? 1 : 0,
                });
              }}
              disabled={isLoading}
            >
              <option value="">-- Select Smoking Status --</option>
              <option value={1}>Formerly Smoked</option>
              <option value={2}>Never Smoked</option>
              <option value={3}>Smokes</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Predict'}
          </button>

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Analyzing patient data...</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}