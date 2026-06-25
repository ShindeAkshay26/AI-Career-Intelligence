import { useState } from "react";
import api from "../api/api";

function ResumeChat({ setPage }: any) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    setLoading(true);

    try {
      const response = await api.post("/chat", {
        question: currentQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: response.data.answer,
        },
      ]);

      setQuestion("");
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
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          marginBottom: "20px",
        }}
      >
        🤖 Resume AI Assistant
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Ask questions about the uploaded resume
      </p>

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
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about the resume..."
          style={{
            width: "700px",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #334155",
            fontSize: "16px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
        />

        <button
          onClick={askQuestion}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "0 24px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Ask
        </button>
      </div>

      {loading && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          🤔 Thinking...
        </p>
      )}

      {messages.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index}>
              {/* User Question */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "14px 18px",
                    borderRadius: "18px",
                    maxWidth: "70%",
                    fontWeight: "500",
                  }}
                >
                  {msg.question}
                </div>
              </div>

              {/* AI Answer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    background: "#f1f5f9",
                    color: "#1f2937",
                    padding: "18px",
                    borderRadius: "18px",
                    maxWidth: "80%",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.15)",
                    lineHeight: "1.8",
                  }}
                >
                  🤖 {msg.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeChat;