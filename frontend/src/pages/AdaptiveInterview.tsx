import { useState } from "react";
import api from "../api/api";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function AdaptiveInterview() {
  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] =
    useState(1);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] =
  useState(false);

  const [history, setHistory] = useState<any[]>(
    []
  );

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speakQuestion = (
    text: string
  ) => {
    const utterance =
      new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(
      utterance
    );
  };

  const startInterview = async () => {
    setLoading(true);

    try {
      const response = await api.post(
        "/next-question",
        {
          role: "Data Engineer",
          summary:
            "Experienced Data Engineer",
          job_description:
            "Looking for Azure, Spark, Databricks skills",
          history: "",
          question_number: 1,
        }
      );

      const q =
        response.data.question;

      setQuestion(q);

      speakQuestion(q);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

    const startRecording = () => {
    setIsRecording(true);

    resetTranscript();

    SpeechRecognition.startListening({
        continuous: true,
    });
    };

    const stopRecording = () => {
    setIsRecording(false);

    SpeechRecognition.stopListening();
    };



  if (
    !browserSupportsSpeechRecognition
  ) {
    return (
      <h2>
        Browser does not support
        Speech Recognition
      </h2>
    );
  }

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
          marginBottom: "30px",
        }}
      >
        🧠 Adaptive AI Interview
      </h1>

      <p
        style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
        }}
        >
        Adaptive Voice Interview Assistant
        </p>

      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          onClick={startInterview}
          disabled={question !== ""}
          style={{
            padding: "12px 24px",
            background: "#2563eb",
            opacity: question ? 0.6 : 1,
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚀 Start Interview
        </button>
      </div>

      {loading && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Generating Question...
        </p>
      )}

      {question && (
        <>
          <div
            style={{
                marginTop: "30px",
                padding: "30px",
                background: "#111827",
                border: "1px solid #2563eb",
                borderRadius: "20px",
                boxShadow:
                "0 0 20px rgba(37,99,235,0.25)",
            }}
            >
            <h3
                style={{
                    color: "#60a5fa",
                    marginBottom: "15px",
                }}
                >
                🤖 AI Interviewer
                </h3>

                <div
                style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    marginBottom: "15px",
                }}
                >
                Question {questionNumber}
                </div>
                <div
                    style={{
                        marginTop: "10px",
                        marginBottom: "20px",
                    }}
                    >
                    <div
                        style={{
                        height: "8px",
                        background: "#1e293b",
                        borderRadius: "20px",
                        }}
                    >
                        <div
                        style={{
                            width: `${questionNumber * 10}%`,
                            height: "100%",
                            background: "#2563eb",
                            borderRadius: "20px",
                        }}
                        />
                    </div>
                    </div>

            <p
                style={{
                    fontSize: "22px",
                    lineHeight: "1.8",
                    color: "white",
                    fontWeight: "500",
                }}
                >
                {question}
                </p>
          </div>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <button
              onClick={startRecording}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              🎙 Start Recording
            </button>

            <button
              onClick={stopRecording}
              style={{
                padding: "10px 20px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              ⏹ Stop Recording
            </button>
          </div>

          <div
            style={{
                textAlign: "center",
                marginTop: "15px",
                color: isRecording
                ? "#22c55e"
                : "#94a3b8",
                fontWeight: "bold",
            }}
            >
            {isRecording
                ? "🟢 Listening..."
                : "⚪ Ready"}
            </div>

          <div
            style={{
              marginTop: "25px",
              padding: "25px",
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "16px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.15)",
            }}
          >
            <h3
                style={{
                    color: "#22c55e",
                    marginBottom: "15px",
                }}
                >
                🎙 Candidate Response
                </h3>

            <p
                style={{
                    lineHeight: "1.8",
                    color: "#e5e7eb",
                    minHeight: "80px",
                    fontSize: "16px",
                }}
                >
              {transcript ||
                "Start speaking and your answer will appear here..."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default AdaptiveInterview;