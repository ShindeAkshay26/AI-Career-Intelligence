import { useState } from "react";
import UploadResume from "./pages/UploadResume";
import ResumeChat from "./pages/ResumeChat";
import MockInterview from "./pages/MockInterview";
import AdaptiveInterview from "./pages/AdaptiveInterview";

function App() {
  const [page, setPage] = useState("analysis");
  const [resumeData, setResumeData] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jdResult, setJdResult] = useState<any>(null);

  return (
    <div>
      {page === "analysis" && (
        <UploadResume
          setPage={setPage}
          resumeData={resumeData}
          setResumeData={setResumeData}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          jdResult={jdResult}
          setJdResult={setJdResult}
        />
      )}

      {page === "chat" && (
        <ResumeChat setPage={setPage} resumeData={resumeData} />
      )}

      {page === "interview" && (
        <MockInterview setPage={setPage} resumeData={resumeData} />
      )}

      {page === "adaptive" && (
        <AdaptiveInterview
          setPage={setPage}
          resumeData={resumeData}
          jobDescription={jobDescription}
        />
      )}
    </div>
  );
}

export default App;