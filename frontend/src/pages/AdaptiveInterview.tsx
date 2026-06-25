import { useState } from "react";
import api from "../api/api";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function AdaptiveInterview({
  setPage,
  resumeData,
  jobDescription,
}: any) {
  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] =
    useState(1);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] =
    useState(false);
  const [evaluation, setEvaluation] =
    useState("");
  const resumeRole = resumeData?.predicted_role || "";
  const resumeSummary = resumeData?.summary || "";
  const resumeSkills = resumeData?.skills || [];
  const overallMatch =
  evaluation.match(/Overall Score:\s*(\d+)/);

  const technicalMatch =
    evaluation.match(
      /Technical Knowledge:\s*(\d+)/
    );

  const communicationMatch =
    evaluation.match(
      /Communication:\s*(\d+)/
    );

  const confidenceMatch =
    evaluation.match(
      /Confidence:\s*(\d+)/
    );


  const finishInterview = async () => {
    try {
      const response = await api.post(
        "/evaluate-interview",
        {
          role: resumeRole,
          summary: resumeSummary,
          job_description: jobDescription,
          history: JSON.stringify(history),
        }
      );

      setEvaluation(response.data.evaluation);
    } catch (error) {
      console.error(error);
    }
  };
  const [history, setHistory] = useState<
    {
        question: string;
        answer: string;
    }[]
    >([]);

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
          role: resumeRole,
          summary: resumeSummary,
          job_description: jobDescription,
          history: JSON.stringify(history),
          question_number: 1,
        }
      );

      const q = response.data.question;

      setQuestion(q);
      setQuestionNumber(1);

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

  const nextQuestion = async () => {
    if (!transcript.trim()) return;

    const updatedHistory = [
      ...history,
      {
        question,
        answer: transcript,
      },
    ];

    setHistory(updatedHistory);

    setLoading(true);

    try {
      const response = await api.post(
        "/next-question",
        {
          role: resumeRole,
          summary: resumeSummary,
          job_description: jobDescription,
          history: JSON.stringify(updatedHistory),
          question_number: questionNumber + 1,
        }
      );

      const newQuestion = response.data.question;

      setQuestion(newQuestion);
      setQuestionNumber((prev) => prev + 1);

      resetTranscript();
      speakQuestion(newQuestion);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
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
          marginBottom: "25px",
          textAlign: "center",
          color: "#cbd5e1",
        }}
      >
        <div>
          <strong>Role:</strong>{" "}
          {resumeRole || "No resume analysis available"}
        </div>

        <div style={{ marginTop: "8px" }}>
          {resumeSkills.slice(0, 6).map(
            (skill: string) => (
              <span
                key={skill}
                style={{
                  display: "inline-block",
                  margin: "4px",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  background: "#1e293b",
                }}
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          onClick={startInterview}
          disabled={question !== "" || !resumeRole}
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
        {!resumeRole && (
          <p
            style={{
              marginTop: "12px",
              color: "#f43f5e",
            }}
          >
            Upload a resume first to use the adaptive interview
            with your analyzed role and summary.
          </p>
        )}
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
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={
                    isRecording
                      ? stopRecording
                      : startRecording
                  }
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "28px",
                    background: isRecording
                      ? "#dc2626"
                      : "#2563eb",
                    color: "white",
                    boxShadow:
                      "0 0 20px rgba(37,99,235,0.3)",
                  }}
                >
                  {isRecording ? "⏹" : "🎤"}
                </button>

                <div
                  style={{
                    marginTop: "10px",
                    color: "#94a3b8",
                  }}
                >
                  {isRecording
                    ? "Recording..."
                    : "Tap to answer"}
                </div>
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
              <div
                style={{
                  textAlign: "center",
                  marginTop: "25px",
                }}
              >
                {questionNumber < 10 ? (
                  <button
                    onClick={nextQuestion}
                    style={{
                      padding: "12px 24px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={finishInterview}
                    style={{
                      padding: "12px 24px",
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    🏁 Finish Interview
                  </button>
                )}
              </div>
              {evaluation && (
                  <div
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                    >
                      📊 Interview Report
                    </h2>

                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "20px",
                          background: "#111827",
                          borderRadius: "12px",
                          textAlign: "center",
                        }}
                      >
                        <h4>🏆 Overall</h4>
                        <h2>
                          {overallMatch
                            ? overallMatch[1]
                            : "--"}
                        </h2>
                      </div>

                      <div
                        style={{
                          flex: 1,
                          padding: "20px",
                          background: "#111827",
                          borderRadius: "12px",
                          textAlign: "center",
                        }}
                      >
                        <h4>🧠 Technical</h4>
                        <h2>
                            {technicalMatch
                              ? technicalMatch[1]
                              : "--"}
                        </h2>
                      </div>

                      <div
                        style={{
                          flex: 1,
                          padding: "20px",
                          background: "#111827",
                          borderRadius: "12px",
                          textAlign: "center",
                        }}
                      >
                        <h4>💬 Communication</h4>
                        <h2>
                          {communicationMatch
                            ? communicationMatch[1]
                            : "--"}
                        </h2>
                      </div>

                      <div
                        style={{
                          flex: 1,
                          padding: "20px",
                          background: "#111827",
                          borderRadius: "12px",
                          textAlign: "center",
                        }}
                      >
                        <h4>🚀 Confidence</h4>
                        <h2>
                          {confidenceMatch
                            ? confidenceMatch[1]
                            : "--"}
                        </h2>
                      </div>  
                    </div>

                    <div
                      style={{
                        padding: "25px",
                        background: "#111827",
                        borderRadius: "16px",
                        border: "1px solid #2563eb",
                      }}
                    >
                      <pre
                        style={{
                          whiteSpace: "pre-wrap",
                          color: "#e5e7eb",
                          fontFamily: "inherit",
                        }}
                      >
                        {evaluation}
                      </pre>
                    </div>
                  </div>
                )}
        </>
      )}
    </div>
  );
}

export default AdaptiveInterview;