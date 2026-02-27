import "./VideoAnalysis.css";
import faceIcon from "../../assets/form-assets/face.svg";
import videoIcon from "../../assets/form-assets/video.svg";
import footPrintIcon from "../../assets/form-assets/foot-print.svg";
import { useNavigate } from "react-router-dom";
import importIcon from "../../assets/form-assets/import-icon.svg";
import PopupUploadFile from "./PopupUploadFile";
import { useState, useEffect } from "react";
import PopupUploadOrRecord from "./PopupUploadOrRecord";
import PopupAudioDropzone from "./PopupAudioDropzone";
import AudioAnalysisResult from "./AudioAnalysisResult";

const industryOptions = [
  {
    value: 1,
    label: "Mortgage Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 2,
    label: "Commercial Banking",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 3,
    label: "Peer-to-Peer (P2P) Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 4,
    label: "Small Business Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 5,
    label: "Student Loan Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 6,
    label: "Auto Loan Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 7,
    label: "Personal Loan Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 8,
    label: "Payday Loan Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 9,
    label: "Agricultural and Farm Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 10,
    label: "Equipment Financing Lending",
    groupValue: "loanDefault",
    groupLabel: "Loan Default",
  },
  {
    value: 11,
    label: "Debt Repayment Probability",
    groupValue: "debtCollection",
    groupLabel: "Debt Collection",
  },
  {
    value: 12,
    label: "Mental Wellness",
    groupValue: "mentalWellness",
    groupLabel: "Mental Wellness",
  },
  {
    value: 13,
    label: "Employee Churn",
    groupValue: "employeeChurn",
    groupLabel: "Employee Churn",
  },
  {
    value: 14,
    label: "Credit Card Fraud Detection",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 15,
    label: "Insurance Fraud",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 16,
    label: "Retail Fraud Prevention",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 17,
    label: "Healthcare Fraud Detection",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 18,
    label: "Cybersecurity Fraud",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 19,
    label: "Mortgage Fraud",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 20,
    label: "Telecommunications Fraud Management",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 21,
    label: "Tax Evasion Detection",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 22,
    label: "Identity Theft Prevention",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 23,
    label: "Securities and Investment Fraud",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 24,
    label: "General Fraud",
    groupValue: "fraud",
    groupLabel: "Fraud",
  },
  {
    value: 25,
    label: "Candidate Success General",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 26,
    label: "Construction",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 27,
    label: "Management",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 28,
    label: "Programming Tech",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 29,
    label: "Sales Marketing",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 30,
    label: "Sales",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 31,
    label: "Marketing",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 32,
    label: "AI Content Translation",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 33,
    label: "Legal Finance",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 34,
    label: "Design Creativity",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 35,
    label: "Accountant",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 36,
    label: "Recruiter",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 37,
    label: "Operation Manager",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 38,
    label: "Customer Service Representative",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 39,
    label: "Technical Support Specialist",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
  {
    value: 40,
    label: "Telesales Agents",
    groupValue: "candidateSuccess",
    groupLabel: "Candidate Success",
  },
];

const VideoAnalysis = () => {
  const navigate = useNavigate();
  const [openUploadPopup, setOpenUploadPopup] = useState(false);
  const [openUploadOrRecord, setOpenUploadOrRecord] = useState(false);
  const [openAudioDropzone, setOpenAudioDropzone] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(
    industryOptions[0]?.value || "",
  );
  const [analysisResult, setAnalysisResult] = useState(null);
  const [setIgairInfo] = useState(null);
  const [setIgairLoading] = useState(false);
  const [setIgairError] = useState(null);

  // Group options by their groupValue
  const groupedOptions = industryOptions.reduce((acc, option) => {
    if (!acc[option.groupValue]) {
      acc[option.groupValue] = {
        label: option.groupLabel,
        options: [],
      };
    }
    acc[option.groupValue].options.push(option);
    return acc;
  }, {});

  // Fetch IGAIR info balance
  useEffect(() => {
    const fetchIGAIrInfo = async () => {
      const address = localStorage.getItem("a");
      if (!address) return;
      setIgairLoading(true);
      setIgairError(null);
      try {
        const res = await fetch(
          `https://api.insightgenesis.ai/info?addr=${address}`,
        );
        if (!res.ok) throw new Error("Failed to fetch IGAIr info");
        const data = await res.json();
        setIgairInfo(data);
      } catch (err) {
        setIgairError("Failed to load IGAIr info");
      } finally {
        setIgairLoading(false);
      }
    };
    fetchIGAIrInfo();
  }, []);

  return (
    <div className="video-analysis-root">
      <header className="video-analysis-header">
        <h1 className="video-analysis-title">
          TEST OUR{" "}
          <span className="blue">
            PRE-BUILT BEHAVIOR
            <br />
            MODULES
          </span>{" "}
          FOR YOURSELF
        </h1>
        <p className="video-analysis-subtitle">
          Our integrated behavior modules enable you to get started immediately.
          Try it for yourself.
        </p>
      </header>
      <div className="video-analysis-card-row">
        <div
          className="video-analysis-card"
          onClick={() => navigate("/insights-form/face-analysis")}
        >
          <img
            src={faceIcon}
            alt="Face Scan"
            className="video-analysis-card-icon"
          />
          <div className="video-analysis-card-title">Face Scan Analysis</div>
        </div>
        <div
          className="video-analysis-card"
          onClick={() => navigate("/insights-form/video-analysis")}
        >
          <img
            src={videoIcon}
            alt="Voice"
            className="video-analysis-card-icon"
          />
          <div className="video-analysis-card-title">Voice Analysis</div>
        </div>
        <div
          className="video-analysis-card"
          onClick={() => navigate("/insights-form/digital-footprint")}
        >
          <img
            src={footPrintIcon}
            alt="Digital Footprint"
            className="video-analysis-card-icon"
          />
          <div className="video-analysis-card-title">Digital Footprint</div>
        </div>
      </div>
      <section className="video-analysis-section">
        <div className="video-analysis-section-title">
          <h2>VOICE ANALYSIS</h2>
          <p>
            Our pre-built voice module, trained on over hundreds of thousands
            voice samples is used by banks, insurance companies and employers to
            model fraud detection, job suitability and repayment intent.
          </p>
        </div>

        <div
          className="video-analysis-upload"
          onClick={() => setOpenUploadPopup(true)}
        >
          <img
            src={importIcon}
            alt="Upload"
            className="video-analysis-upload-icon"
          />
          <div className="video-analysis-upload-text">
            Record Now or Upload Audio
          </div>
        </div>
        <PopupUploadFile
          open={openUploadPopup}
          onClose={() => setOpenUploadPopup(false)}
          onAgree={() => {
            setOpenUploadPopup(false);
            setOpenUploadOrRecord(true);
          }}
        />
        <PopupUploadOrRecord
          open={openUploadOrRecord}
          onClose={() => setOpenUploadOrRecord(false)}
          selectedIndustry={selectedIndustry}
          onUploadAudio={() => {
            setOpenUploadOrRecord(false);
            setOpenAudioDropzone(true);
          }}
        />
        <PopupAudioDropzone
          open={openAudioDropzone}
          onClose={() => setOpenAudioDropzone(false)}
          industryOptions={industryOptions}
          selectedIndustry={selectedIndustry}
          onAnalysisComplete={(result) => {
            setAnalysisResult(result);
            setOpenAudioDropzone(false);
          }}
        />

        <div className="video-analysis-industry">
          <div className="video-analysis-industry-label">
            Choose your industry
          </div>
          <select
            className="video-analysis-industry-select"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {Object.entries(groupedOptions).map(([groupValue, group]) => (
              <optgroup key={groupValue} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <button
          onClick={() => navigate("/form/result")}
          className="video-analysis-submit"
        >
          Show insight
        </button>
      </section>
      {analysisResult && (
        <AudioAnalysisResult
          result={analysisResult}
          industryOptions={industryOptions}
        />
      )}
    </div>
  );
};

export default VideoAnalysis;
