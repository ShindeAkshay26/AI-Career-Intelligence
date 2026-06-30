import { useState } from "react";
import api from "../api/api";

function MockInterview({ setPage, resumeData }: any) {
  const [role, setRole] = useState(
    resumeData?.predicted_role || ""
  );
  const [interviewType, setInterviewType] =
    useState("Technical");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [questionCount, setQuestionCount] =
    useState(10);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateInterview = async () => {
    if (!role.trim()) {
      alert("Please enter a target role to generate questions.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("role", role.trim());

    try {
      const response = await api.post(
        "/generate-interview",
        formData
      );

      setRole(response.data.role);

      const questionArray =
        response.data.questions
          .split("\n")
          .filter(
            (q: string) =>
              /^\d+\./.test(q.trim())
          );

      setQuestions(questionArray);
      setCurrentQuestion(0);
      setAnswers([]);
      setUserAnswer("");
      setFinished(false);
    } catch (error) {
      console.error(error);
      alert("Unable to generate interview questions. Please try again.");
    }

    setLoading(false);
  };

  const saveAnswer = () => {
    if (!userAnswer.trim()) {
      alert("Write your answer before continuing.");
      return;
    }

    setAnswers((prev) => [...prev, userAnswer.trim()]);
    setUserAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
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
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => setPage("analysis")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back to Resume
        </button>
      </div>

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
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Target role (e.g. Senior Backend Engineer)"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontSize: "16px",
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

      {questions.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            background: "#e2e8f0",
            padding: "24px",
            borderRadius: "16px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2563eb",
            }}
          >
            🎯 Target Role: {role}
          </h2>

          <h3
            style={{
              textAlign: "center",
            }}
          >
            Question {currentQuestion + 1}
            / {questions.length}
          </h3>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "20px",
            }}
          >
            {questions[currentQuestion]}
          </div>

          {!finished ? (
            <>
              <textarea
                value={userAnswer}
                onChange={(e) =>
                  setUserAnswer(e.target.value)
                }
                placeholder="Type your answer here..."
                rows={8}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={saveAnswer}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {currentQuestion < questions.length - 1
                    ? "Save Answer & Next"
                    : "Finish Interview"}
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                marginTop: "24px",
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                Interview Completed
              </h3>

              <p
                style={{
                  textAlign: "center",
                  color: "#475569",
                }}
              >
                Your answers have been recorded for {questions.length} questions.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  display: "grid",
                  gap: "16px",
                }}
              >
                {questions.map((question, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#f8fafc",
                      padding: "16px",
                      borderRadius: "12px",
                    }}
                  >
                    <strong>{question}</strong>
                    <p
                      style={{
                        marginTop: "10px",
                        color: "#334155",
                      }}
                    >
                      {answers[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MockInterview;