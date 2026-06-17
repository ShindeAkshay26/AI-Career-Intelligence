import { useState } from "react";
import api from "../api/api";

function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Career Intelligence</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={uploadResume}
        style={{ marginLeft: "10px" }}
      >
        Analyze Resume
      </button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Predicted Role</h2>
          <p>{result.predicted_role}</p>

          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Skills</h2>
          <ul>
            {result.skills.map(
              (skill: string) => (
                <li key={skill}>{skill}</li>
              )
            )}
          </ul>

          <h2>ATS Score</h2>
          <p>{result.ats_analysis.score}/100</p>
        </div>
      )}
    </div>
  );
}

export default UploadResume;