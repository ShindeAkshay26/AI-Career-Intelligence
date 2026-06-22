import { useState } from "react";
import api from "../api/api";

function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jdResult, setJdResult] = useState<any>(null);
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

      if (jobDescription.trim()) {

        const jdFormData = new FormData();

        jdFormData.append("file", file);

        jdFormData.append(
          "job_description",
          jobDescription
        );

        const jdResponse = await api.post(
          "/jd-match",
          jdFormData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setJdResult(jdResponse.data);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const atsScore = result?.ats_analysis?.score || 0;

  const atsColor =
    atsScore >= 90
      ? "#16a34a"
      : atsScore >= 70
      ? "#ea580c"
      : "#dc2626";

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "30px",
          fontSize: "56px",
          fontWeight: "bold",
        }}
      >
        AI Career Intelligence
      </h1>

      <div
        style={{
          padding: "24px",
          borderRadius: "16px",
          background: "#f1f5f9",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <textarea
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          placeholder="Paste Job Description Here (Optional)"
          rows={6}
          style={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #cbd5e1",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />


        <button
          onClick={uploadResume}
          style={{
            marginLeft: "12px",
            padding: "12px 24px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Analyze Resume
        </button>

        {loading && (
          <p
            style={{
              marginTop: "15px",
              color: "#1f2937",
            }}
          >
            Analyzing Resume...
          </p>
        )}
      </div>

      {result && (
        <>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "30px",
                background: "#f1f5f9",
                color: "#1f2937",
                borderRadius: "16px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              <h3>👨‍💻 Predicted Role</h3>

              <h2
                style={{
                  color: "#2563eb",
                }}
              >
                {result.predicted_role}
              </h2>
            </div>

            <div
              style={{
                flex: 1,
                padding: "30px",
                background: "#f1f5f9",
                color: "#1f2937",
                borderRadius: "16px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              <h3>📊 ATS Score</h3>

              <h2
                style={{
                  color: atsColor,
                  fontSize: "36px",
                }}
              >
                {atsScore}/100
              </h2>
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              background: "#f1f5f9",
              color: "#1f2937",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              🛠 Skills
            </h3>

            <div
              style={{
                textAlign: "center",
              }}
            >
              {result.skills.map((skill: string) => (
                <span
                  key={skill}
                  style={{
                    display: "inline-block",
                    padding: "10px 16px",
                    margin: "6px",
                    borderRadius: "25px",
                    background: "#2563eb",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              background: "#f1f5f9",
              color: "#1f2937",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              📝 Resume Summary
            </h3>

            <p
                style={{
                  lineHeight: "2",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {result.summary}
              </p>
              </div>

              {jdResult && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "24px",
                    background: "#f1f5f9",
                    color: "#1f2937",
                    borderRadius: "16px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                    }}
                  >
                    🎯 Job Description Match
                  </h3>

                  <h1
                    style={{
                      textAlign: "center",
                      color:
                        jdResult.match_score >= 80
                          ? "#16a34a"
                          : "#ea580c",
                    }}
                  >
                    {jdResult.match_score}%
                  </h1>

                  <h4>✅ Matching Skills</h4>

                  <div>
                    {jdResult.matching_skills.map(
                      (skill: string) => (
                        <span
                          key={skill}
                          style={{
                            display: "inline-block",
                            padding: "8px 14px",
                            margin: "5px",
                            borderRadius: "20px",
                            background: "#16a34a",
                            color: "white",
                          }}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  <h4 style={{ marginTop: "20px" }}>
                    ❌ Missing Skills
                  </h4>

                  <div>
                    {jdResult.missing_skills.map(
                      (skill: string) => (
                        <span
                          key={skill}
                          style={{
                            display: "inline-block",
                            padding: "8px 14px",
                            margin: "5px",
                            borderRadius: "20px",
                            background: "#dc2626",
                            color: "white",
                          }}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              </>
              )}
    </div>
  );
}

export default UploadResume;