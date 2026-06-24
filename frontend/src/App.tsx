import { useState } from "react";
import UploadResume from "./pages/UploadResume";
import ResumeChat from "./pages/ResumeChat";
import MockInterview from "./pages/MockInterview";
import AdaptiveInterview from "./pages/AdaptiveInterview";

function App() {
  const [page, setPage] = useState("analysis");

 return (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "6px",
          borderRadius: "999px",
          display: "flex",
          gap: "6px",
        }}
      >
        <button
          onClick={() => setPage("analysis")}
          style={{
            background:
              page === "analysis"
                ? "#2563eb"
                : "transparent",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          📄 Resume Analysis
        </button>

        <button
          onClick={() => setPage("chat")}
          style={{
            background:
              page === "chat"
                ? "#2563eb"
                : "transparent",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          🤖 Resume Chat
        </button>
        <button
          onClick={() => setPage("interview")}
          style={{
            background:
              page === "interview"
                ? "#2563eb"
                : "transparent",
            color: "white",
            border: "none",
            padding: "10x 24x",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          🎤 Mock Interview
        </button>

        <button
          onClick={() =>
            setPage("adaptive")}
            style={{
            background:
              page === "adaptive"
                ? "#2563eb"
                : "transparent",
            color: "white",
            border: "none",
            padding: "10x 24x",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          🧠 Adaptive Interview
        </button>
      </div>
    </div>

    <div
        style={{
          display:
            page === "analysis"
              ? "block"
              : "none",
        }}
      >
        <UploadResume />
      </div>

      <div
        style={{
          display:
            page === "chat"
              ? "block"
              : "none",
        }}
      >
        <ResumeChat />
      </div>

      <div
        style={{
          display:
            page === "interview"
              ? "block"
              : "none",
        }}
      >
        <MockInterview />
      </div>

      <div
      style={{
        display:
          page === "adaptive"
            ? "block"
            : "none",
      }}
    >
      <AdaptiveInterview />
    </div>
  </div>
);
}

export default App;