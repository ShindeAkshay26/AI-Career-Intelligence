import { useState } from "react";
import api from "../api/api";

function MockInterview() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInterview = async () => {
    if (!file || !jobDescription) {
      alert("Upload resume and enter JD");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "job_description",
      jobDescription
    );

    try {
      const response = await api.post(
        "/generate-interview",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setRole(response.data.role);
      setQuestions(response.data.questions);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎤 AI Mock Interview
      </h1>

      <div
        style={{
          background: "#f1f5f9",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

        <textarea
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          rows={10}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            borderRadius: "10px",
          }}
        />

        <button
          onClick={generateInterview}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Generate Interview
        </button>
      </div>

      {loading && (
        <h3
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Generating Questions...
        </h3>
      )}

      {questions && (
        <div
          style={{
            marginTop: "30px",
            background: "#f1f5f9",
            padding: "24px",
            borderRadius: "16px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h2>
            🎯 Target Role: {role}
          </h2>

          <h2
            style={{
              textAlign: "center",
              color: "#2563eb",
            }}
          >
            🎯 Target Role: {role}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <div>
              <h3>📊 Questions</h3>
              <p>10</p>
            </div>

            <div>
              <h3>🎤 Interview Type</h3>
              <p>AI Generated</p>
            </div>
          </div>

          <div
            style={{
              background: "#e2e8f0",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Generated Interview Questions
            </h3>

            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "2",
                color: "#1f2937",
              }}
            >
              {questions}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MockInterview;