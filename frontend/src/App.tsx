import { useState } from "react";
import UploadResume from "./pages/UploadResume";
import ResumeChat from "./pages/ResumeChat";

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
      </div>
    </div>

    {page === "analysis" && <UploadResume />}
    {page === "chat" && <ResumeChat />}
  </div>
);
}

export default App;